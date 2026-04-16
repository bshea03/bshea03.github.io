import { AwardListModel } from "../db/models/index.js";
import type { Award } from "@types";

async function getList() {
  const doc = await AwardListModel.findOne();
  if (doc) return doc;
  return AwardListModel.create({ awards: [] });
}

export async function getAllAwards(): Promise<Award[]> {
  const doc = await getList();
  return doc.awards as unknown as Award[];
}

export async function getAwardById(id: number): Promise<Award | null> {
  const doc = await getList();
  return (doc.awards.find((a: any) => a.id === id) as unknown as Award) ?? null;
}

export async function createAward(data: Omit<Award, "id">): Promise<Award> {
  const doc = await getList();
  const awards = doc.awards as unknown as Award[];
  const nextId = awards.length ? Math.max(...awards.map((a) => a.id)) + 1 : 1;
  const award: Award = { ...(data as Award), id: nextId };
  doc.awards.push(award as any);
  await doc.save();
  return award;
}

export async function updateAward(id: number, data: Partial<Award>): Promise<Award | null> {
  const doc = await getList();
  const index = (doc.awards as unknown as Award[]).findIndex((a) => a.id === id);
  if (index === -1) return null;
  Object.assign(doc.awards[index], data);
  await doc.save();
  return doc.awards[index] as unknown as Award;
}

export async function deleteAward(id: number): Promise<boolean> {
  const doc = await getList();
  const before = doc.awards.length;
  doc.awards = doc.awards.filter((a: any) => a.id !== id) as any;
  if (doc.awards.length === before) return false;
  await doc.save();
  return true;
}

export async function reorderAwards(ids: number[]): Promise<Award[]> {
  const doc = await getList();
  const awards = doc.awards as unknown as Award[];
  const map = new Map(awards.map((a) => [a.id, a]));
  const reordered = ids.map((id) => map.get(id)).filter(Boolean) as Award[];
  doc.awards = reordered as any;
  await doc.save();
  return reordered;
}
