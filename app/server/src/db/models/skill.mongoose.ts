import { Schema, model } from "mongoose";
import type { Skill } from "@types";

const skillSchema = new Schema<Skill>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    category: {
      type: String,
      enum: ["frontend", "backend", "cloud", "tools", "testing"],
    },
    rank: { type: Number },
  },
  { timestamps: true },
);

skillSchema.index({ category: 1, rank: 1 });

export const SkillModel = model<Skill>("Skill", skillSchema, "skills");
