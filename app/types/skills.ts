export interface Technology {
  name: string;
  icon: string;
}

export interface Skill {
  name: string;
  technologies: Technology[];
}
