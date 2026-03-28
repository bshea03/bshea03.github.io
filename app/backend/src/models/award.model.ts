import { AwardModel } from "../db/models/index.js";
import type { Award } from "@types";

const STRIP = "-_id -__v -createdAt -updatedAt";

export async function getAllAwards(): Promise<Award[]> {
  return AwardModel.find().select(STRIP).lean<Award[]>();
}

export async function getAwardById(id: number): Promise<Award | null> {
  return AwardModel.findOne({ id }).select(STRIP).lean<Award | null>();
}
