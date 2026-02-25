import { SkillModel } from "../db/models/index.js";
import type { Skill, SkillList } from "@types";

const STRIP = "-_id -__v -createdAt -updatedAt";

export async function getAllSkills(): Promise<Skill[]> {
  return SkillModel.find().select(STRIP).lean<Skill[]>();
}

export async function getSkillsList(): Promise<SkillList> {
  const skills = await getAllSkills();
  const rankSort = (s1: Skill, s2: Skill) => (s1.rank ?? 0) - (s2.rank ?? 0);

  return {
    frontend: skills.filter((s) => s.category === "frontend").sort(rankSort),
    backend: skills.filter((s) => s.category === "backend").sort(rankSort),
    testing: skills.filter((s) => s.category === "testing").sort(rankSort),
    cloud: skills.filter((s) => s.category === "cloud").sort(rankSort),
    tools: skills.filter((s) => s.category === "tools").sort(rankSort),
  };
}

export async function updateSkill(
  name: string,
  updates: Partial<Omit<Skill, "id" | "name">>,
) {
  return SkillModel.updateOne({ name }, { $set: updates });
}
