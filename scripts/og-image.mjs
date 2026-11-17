// Renders public/og.png: the top of the home page, above Work, without the
// theme toggle or the contact links. Run it against a running site: `node scripts/og-image.mjs [url]`.
import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const VIEWPORT = { height: 900, width: 1200 };
const SETTLE_MS = 2500;
const DEVTOOLS_LINE = /DevTools listening on (?<endpoint>ws:\/\/\S+)/u;

const DEFAULT_CHROME = {
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  linux: "google-chrome",
  win32: String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`,
};

const url = process.argv[2] ?? "http://localhost:3217";
const output = path.join(import.meta.dirname, "..", "public", "og.png");
const chromePath = process.env.CHROME_PATH ?? DEFAULT_CHROME[process.platform];

const hideForCapture = `
  header button { visibility: hidden !important; }
  main section > :has(> nav[aria-label="Elsewhere"]) { display: none !important; }
  nuxt-devtools-frame, #nuxt-devtools-container { display: none !important; }
`;

/** Where the capture ends: halfway between the separator and the Work frame. */
const measureFold = `(() => {
  const hatch = document.querySelector("main .hatch");
  const work = hatch.nextElementSibling.getBoundingClientRect();
  return (hatch.getBoundingClientRect().bottom + work.top) / 2;
})()`;

const launchChrome = async (profile) => {
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--hide-scrollbars",
    "--remote-debugging-port=0",
    `--user-data-dir=${profile}`,
    "about:blank",
  ]);
  let log = "";
  for await (const chunk of chrome.stderr) {
    log += chunk;
    const match = DEVTOOLS_LINE.exec(log);
    if (match) {
      return { chrome, endpoint: match.groups.endpoint };
    }
  }
  throw new Error(`Chrome exited before opening DevTools:\n${log}`);
};

/** A minimal Chrome DevTools Protocol client over one page session. */
const connect = async (endpoint) => {
  const socket = new WebSocket(endpoint);
  const opened = Promise.withResolvers();
  socket.addEventListener("open", opened.resolve, { once: true });
  socket.addEventListener("error", opened.reject, { once: true });
  await opened.promise;

  const pending = new Map();
  const waiters = new Map();
  let nextId = 0;
  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (message.id !== undefined) {
      const call = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) {
        call.reject(new Error(message.error.message));
      } else {
        call.resolve(message.result);
      }
    } else if (waiters.has(message.method)) {
      waiters.get(message.method).resolve(message.params);
      waiters.delete(message.method);
    }
  });

  const send = (method, params, sessionId) => {
    nextId += 1;
    const call = Promise.withResolvers();
    pending.set(nextId, call);
    socket.send(
      JSON.stringify({ id: nextId, method, params: params ?? {}, sessionId })
    );
    return call.promise;
  };
  const next = (method) => {
    const waiter = Promise.withResolvers();
    waiters.set(method, waiter);
    return waiter.promise;
  };
  return { close: () => socket.close(), next, send };
};

const profile = await mkdtemp(path.join(tmpdir(), "og-image-"));
const { chrome, endpoint } = await launchChrome(profile);
const cdp = await connect(endpoint);
try {
  const { targetId } = await cdp.send("Target.createTarget", {
    url: "about:blank",
  });
  const { sessionId } = await cdp.send("Target.attachToTarget", {
    flatten: true,
    targetId,
  });
  const page = (method, params) => cdp.send(method, params, sessionId);

  await page("Page.enable");
  await page("Emulation.setDeviceMetricsOverride", {
    deviceScaleFactor: 1,
    mobile: false,
    ...VIEWPORT,
  });
  await page("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-color-scheme", value: "dark" }],
  });
  const loaded = cdp.next("Page.loadEventFired");
  await page("Page.navigate", { url });
  await loaded;
  await page("Runtime.evaluate", {
    expression: `document.head.insertAdjacentHTML("beforeend", ${JSON.stringify(`<style>${hideForCapture}</style>`)})`,
  });
  await page("Runtime.evaluate", {
    awaitPromise: true,
    expression: "document.fonts.ready.then(() => true)",
  });
  // Lets the entrance animations finish.
  await sleep(SETTLE_MS);

  const { result } = await page("Runtime.evaluate", {
    expression: measureFold,
    returnByValue: true,
  });
  const height = result.value;
  const width = (height * OG_WIDTH) / OG_HEIGHT;
  const { data } = await page("Page.captureScreenshot", {
    clip: {
      height,
      scale: OG_WIDTH / width,
      width,
      x: (VIEWPORT.width - width) / 2,
      y: 0,
    },
    format: "png",
  });
  await writeFile(output, Buffer.from(data, "base64"));
  console.log(`Wrote ${output} from ${url}`);
} finally {
  cdp.close();
  chrome.kill();
  await sleep(500);
  await rm(profile, { force: true, recursive: true });
}
