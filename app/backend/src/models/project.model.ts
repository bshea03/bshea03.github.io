import { ProjectModel } from "../db/models/index.js";
import type { Project } from "@types";

const STRIP = "-_id -__v -createdAt -updatedAt";

export async function getAllProjects(): Promise<Project[]> {
  return ProjectModel.find().sort({ order: 1 }).select(STRIP).lean<Project[]>();
}

export async function getProjectById(id: number): Promise<Project | null> {
  return ProjectModel.findOne({ id }).select(STRIP).lean<Project | null>();
}

export async function createProject(data: Omit<Project, "id" | "order">): Promise<Project> {
  const last = await ProjectModel.findOne().sort({ id: -1 }).select("id order").lean<{ id: number; order: number }>();
  const nextId = (last?.id ?? 0) + 1;
  const order = (last?.order ?? -1) + 1;
  const created = await ProjectModel.create({ ...data, id: nextId, order });
  const { _id, __v, createdAt, updatedAt, ...project } = created.toObject() as any;
  return project as Project;
}

export async function updateProject(id: number, data: Partial<Project>): Promise<Project | null> {
  return ProjectModel.findOneAndUpdate({ id }, data, { new: true }).select(STRIP).lean<Project | null>();
}

export async function deleteProject(id: number): Promise<boolean> {
  const result = await ProjectModel.deleteOne({ id });
  return result.deletedCount > 0;
}

export async function reorderProjects(ids: number[]): Promise<Project[]> {
  const ops = ids.map((id, order) => ({
    updateOne: { filter: { id }, update: { $set: { order } } },
  }));
  await ProjectModel.bulkWrite(ops);
  return ProjectModel.find().sort({ order: 1 }).select(STRIP).lean<Project[]>();
}
