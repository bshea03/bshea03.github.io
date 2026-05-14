export type Skill = {
  id: string;
  name: string;
  icon: string;
  category: "frontend" | "backend" | "cloud" | "tools" | "testing";
  order: number;
};

export type SkillList = {
  frontend: Skill[];
  backend: Skill[];
  testing: Skill[];
  cloud: Skill[];
  tools: Skill[];
};
