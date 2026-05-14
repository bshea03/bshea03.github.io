import { SkillModel } from "../db/models/index.js";
import type { Skill, SkillList } from "@types";

const STRIP = "-_id -__v -createdAt -updatedAt";

export async function getSkillsList(): Promise<SkillList> {
  const skills = await SkillModel.find().sort({ order: 1 }).select(STRIP).lean<Skill[]>();
  const result: SkillList = { frontend: [], backend: [], testing: [], cloud: [], tools: [] };
  for (const skill of skills) {
    result[skill.category].push(skill);
  }
  return result;
}

export async function updateSkillCategory(category: string, skills: Skill[]): Promise<void> {
  await SkillModel.deleteMany({ category });
  if (skills.length === 0) return;
  const docs = skills.map((s, order) => ({ ...s, category, order }));
  await SkillModel.insertMany(docs);
}
