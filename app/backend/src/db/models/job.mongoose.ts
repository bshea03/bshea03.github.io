import { Schema, model } from "mongoose";
import type { Job, ListItem } from "@types";

const listItemSchema = new Schema<ListItem>(
  {
    text: { type: String, required: true },
  },
  { _id: false },
);
listItemSchema.add({ children: [listItemSchema] });

const jobSchema = new Schema<Job>(
  {
    id: { type: Number, required: true, unique: true },
    company: { type: String, required: true },
    icon: { type: String },
    description: { type: String, required: true },
    dates: { type: String, required: true },
    details: { type: [listItemSchema], required: true },
    location: { type: String },
    skills: { type: [String] },
  },
  { timestamps: true },
);

export const JobModel = model<Job>("Job", jobSchema, "jobs");
