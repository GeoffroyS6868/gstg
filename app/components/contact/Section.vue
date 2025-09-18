<template>
  <section
    id="contact"
    class="w-full max-w-5xl flex flex-col py-16 md:py-32 gap-4"
  >
    <h2 class="text-2xl font-semibold">Contact</h2>
    <UCard :ui="{ body: 'flex flex-row flex-wrap gap-2' }">
      <UiLink to="mailto:g.stanger@outlook.fr">
        <UIcon
          name="i-fluent-mail-24-regular"
          class="size-6 inline-block mr-2"
        />
        Email
      </UiLink>
      <UiLink
        to="https://www.linkedin.com/in/geoffroy-stanger/"
        target="_blank"
        rel="noopener"
      >
        <UIcon name="i-mdi-linkedin" class="size-6 inline-block mr-2" />
        Linkedin
      </UiLink>
      <UiLink
        to="https://github.com/GeoffroyS6868"
        target="_blank"
        rel="noopener"
      >
        <UIcon name="i-mdi-github" class="size-6 inline-block mr-2" />
        Github
      </UiLink>
    </UCard>
  </section>
</template>
