import { Schema, model } from "mongoose";
import type { Skill } from "@types";

const CATEGORIES = ["frontend", "backend", "cloud", "tools", "testing"];

const skillSchema = new Schema<Skill>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String, default: "" },
  },
  { _id: false },
);

const skillListSchema = new Schema(
  {
    category: { type: String, enum: CATEGORIES, required: true, unique: true },
    skills: [skillSchema],
  },
  { timestamps: true },
);

export const SkillListModel = model("SkillList", skillListSchema, "skill_lists");
