import { JobModel } from "../db/models/index.js";
import type { Job } from "@types";

const STRIP = "-_id -__v -createdAt -updatedAt";

export async function getAllJobs(): Promise<Job[]> {
  return JobModel.find().select(STRIP).lean<Job[]>();
}

export async function getJobById(id: number): Promise<Job | null> {
  return JobModel.findOne({ id }).select(STRIP).lean<Job | null>();
}
