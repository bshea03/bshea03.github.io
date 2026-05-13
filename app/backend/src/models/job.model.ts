import { JobModel } from "../db/models/index.js";
import type { Job } from "@types";

const STRIP = "-_id -__v -createdAt -updatedAt";

function parseEndDate(dates: string): Date {
  const end = dates.split(/\s[–-]\s/)[1]?.trim() ?? "";
  if (!end || /present/i.test(end)) return new Date();
  const parsed = new Date(end);
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

function sortByDate(jobs: Job[]): Job[] {
  return [...jobs].sort((a, b) => parseEndDate(b.dates).getTime() - parseEndDate(a.dates).getTime());
}

export async function getAllJobs(): Promise<Job[]> {
  const jobs = await JobModel.find().select(STRIP).lean<Job[]>();
  return sortByDate(jobs);
}

export async function getJobById(id: number): Promise<Job | null> {
  return JobModel.findOne({ id }).select(STRIP).lean<Job | null>();
}

export async function updateJob(id: number, data: Partial<Job>): Promise<Job | null> {
  return JobModel.findOneAndUpdate({ id }, data, { new: true }).select(STRIP).lean<Job | null>();
}

export async function deleteJob(id: number): Promise<boolean> {
  const result = await JobModel.deleteOne({ id });
  return result.deletedCount > 0;
}

export async function createJob(data: Partial<Job>): Promise<Job> {
  const last = await JobModel.findOne().sort({ id: -1 }).select("id").lean<{ id: number }>();
  const nextId = (last?.id ?? 0) + 1;
  const created = await JobModel.create({ ...data, id: nextId });
  const { _id, __v, createdAt, updatedAt, ...job } = created.toObject() as any;
  return job as Job;
}
