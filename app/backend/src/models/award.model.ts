import { AwardModel } from "../db/models/index.js";
import type { Award } from "@types";

const STRIP = "-_id -__v -createdAt -updatedAt";

export async function getAllAwards(): Promise<Award[]> {
  return AwardModel.find().sort({ order: 1 }).select(STRIP).lean<Award[]>();
}

export async function getAwardById(id: number): Promise<Award | null> {
  return AwardModel.findOne({ id }).select(STRIP).lean<Award | null>();
}

export async function createAward(data: Omit<Award, "id" | "order">): Promise<Award> {
  const last = await AwardModel.findOne().sort({ id: -1 }).select("id order").lean<{ id: number; order: number }>();
  const nextId = (last?.id ?? 0) + 1;
  const order = (last?.order ?? -1) + 1;
  const created = await AwardModel.create({ ...data, id: nextId, order });
  const { _id, __v, createdAt, updatedAt, ...award } = created.toObject() as any;
  return award as Award;
}

export async function updateAward(id: number, data: Partial<Award>): Promise<Award | null> {
  return AwardModel.findOneAndUpdate({ id }, data, { new: true }).select(STRIP).lean<Award | null>();
}

export async function deleteAward(id: number): Promise<boolean> {
  const result = await AwardModel.deleteOne({ id });
  return result.deletedCount > 0;
}

export async function reorderAwards(ids: number[]): Promise<Award[]> {
  const ops = ids.map((id, order) => ({
    updateOne: { filter: { id }, update: { $set: { order } } },
  }));
  await AwardModel.bulkWrite(ops);
  return AwardModel.find().sort({ order: 1 }).select(STRIP).lean<Award[]>();
}
