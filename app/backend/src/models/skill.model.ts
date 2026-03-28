import { SkillListModel } from "../db/models/index.js";
import type { Skill, SkillList } from "@types";

export async function getSkillsList(): Promise<SkillList> {
  const docs = await SkillListModel.find().lean();
  const result: SkillList = { frontend: [], backend: [], testing: [], cloud: [], tools: [] };
  for (const doc of docs) {
    const key = doc.category as keyof SkillList;
    if (key in result) result[key] = doc.skills as Skill[];
  }
  return result;
}

export async function updateSkillCategory(
  category: string,
  skills: Skill[],
): Promise<void> {
  await SkillListModel.findOneAndUpdate(
    { category },
    { category, skills },
    { upsert: true, returnDocument: "after" },
  );
}
