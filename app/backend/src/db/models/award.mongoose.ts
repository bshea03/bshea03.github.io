import { Schema, model } from "mongoose";
import type { Award } from "@types";

const awardSchema = new Schema<Award>(
  {
    id: { type: Number, required: true, unique: true },
    order: { type: Number, required: true, default: 0 },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true },
);

export const AwardModel = model<Award>("Award", awardSchema, "awards");
