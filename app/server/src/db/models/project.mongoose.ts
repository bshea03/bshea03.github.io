import { Schema, model } from "mongoose";
import type { Project } from "@types";

const featureSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false },
);

const projectSchema = new Schema<Project>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    details: {
      intro: { type: String, required: true },
      features: { type: [featureSchema], required: true },
      conclusion: { type: String, required: true },
    },
    image: { type: String, required: true },
    alt: { type: String },
    tech: { type: [String], required: true },
    docs: { type: String },
    code: { type: String },
  },
  { timestamps: true },
);

projectSchema.index({ title: 1 }, { unique: true });

export const ProjectModel = model<Project>(
  "Project",
  projectSchema,
  "projects",
);
