export type { Job } from "./job";
export type { ListItem } from "./list";
export type { Award } from "./award";
export type { Project } from "./project";
export type { Skill, SkillList } from "./skill";

import type { Job } from "./job";
import type { Project } from "./project";
import type { Award } from "./award";
import type { SkillList } from "./skill";

// Portfolio API response type
export type Portfolio = {
  jobs: Job[];
  projects: Project[];
  awards: Award[];
  skills: SkillList;
};
