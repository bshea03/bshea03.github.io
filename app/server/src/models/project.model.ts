import { ProjectModel } from "../db/models/index.js";
import type { Project } from "@types";

const STRIP = "-_id -__v -createdAt -updatedAt";

export async function getAllProjects(): Promise<Project[]> {
  return ProjectModel.find().select(STRIP).lean<Project[]>();
}

export async function getProjectById(id: number): Promise<Project | null> {
  return ProjectModel.findOne({ id }).select(STRIP).lean<Project | null>();
}
