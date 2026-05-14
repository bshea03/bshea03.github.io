import { Schema, model } from "mongoose";
import type { Skill } from "@types";

const CATEGORIES = ["frontend", "backend", "cloud", "tools", "testing"];

const skillSchema = new Schema<Skill>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    icon: { type: String, default: "" },
    category: { type: String, enum: CATEGORIES, required: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export const SkillModel = model<Skill>("Skill", skillSchema, "skills");
