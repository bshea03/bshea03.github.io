export type Skill = {
  name: string;
  icon: string;
  category?: "frontend" | "backend" | "cloud" | "tools" | "testing";
  rank?: number;
};

export type SkillList = {
  frontend: Skill[];
  backend: Skill[];
  testing: Skill[];
  cloud: Skill[];
  tools: Skill[];
};
