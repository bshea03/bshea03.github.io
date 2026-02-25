import { Schema, model } from "mongoose";
import type { Award } from "@types";

const awardSchema = new Schema<Award>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true },
);

awardSchema.index({ date: -1 });

export const AwardModel = model<Award>("Award", awardSchema, "awards");
