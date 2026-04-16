import "dotenv/config";
import { connectDB, closeDB } from "../db/connection.js";
import {
  SkillListModel,
  JobModel,
  ProjectModel,
  AwardListModel,
} from "../db/models/index.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import type { Job, Project, Award, SkillList } from "@types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seedDatabase() {
  try {
    console.log("Starting database seed.\n");
    await connectDB();

    const dataPath = join(__dirname, "../data");
    const jobs = JSON.parse(
      readFileSync(join(dataPath, "jobs.json"), "utf-8"),
    ) as Job[];
    const projects = JSON.parse(
      readFileSync(join(dataPath, "projects.json"), "utf-8"),
    ) as Project[];
    const awards = JSON.parse(
      readFileSync(join(dataPath, "awards.json"), "utf-8"),
    ) as Award[];
    const skillList = JSON.parse(
      readFileSync(join(dataPath, "skills.json"), "utf-8"),
    ) as SkillList;

    const jobsWithIds = jobs.map((job, index) => ({
      ...job,
      id: index + 1,
    }));

    const awardsWithIds = awards.map((award, index) => ({
      ...award,
      id: index + 1,
    }));

    // Clear existing collections
    await Promise.all([
      JobModel.deleteMany({}),
      ProjectModel.deleteMany({}),
      AwardListModel.deleteMany({}),
      SkillListModel.deleteMany({}),
    ]);

    // Insert skills as one document per category
    const categories = Object.keys(skillList) as (keyof SkillList)[];
    const skillDocs = categories.map((category) => ({
      category,
      skills: skillList[category],
    }));

    // Insert data
    await Promise.all([
      JobModel.insertMany(jobsWithIds),
      ProjectModel.insertMany(projects),
      AwardListModel.create({ awards: awardsWithIds }),
      SkillListModel.insertMany(skillDocs),
    ]);

    // Sync indexes
    await Promise.all([
      JobModel.syncIndexes(),
      ProjectModel.syncIndexes(),
      SkillListModel.syncIndexes(),
    ]);

    const totalSkills = categories.reduce((sum, cat) => sum + skillList[cat].length, 0);
    console.log("Jobs:", jobsWithIds.length);
    console.log("Projects:", projects.length);
    console.log("Awards:", awards.length);
    console.log("Skills:", totalSkills, `(${categories.length} categories)`);
    console.log("\nDatabase seeded successfully");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await closeDB();
  }
}

seedDatabase();
