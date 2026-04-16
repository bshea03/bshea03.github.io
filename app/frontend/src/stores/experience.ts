import type { Award, Job, Project, Skill, SkillList } from "@types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";

function parseEndDate(dates: string): Date {
  const end = dates.split(/\s[–-]\s/)[1]?.trim() ?? "";
  if (!end || /present/i.test(end)) return new Date();
  const parsed = new Date(end);
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

function sortByDate(jobList: Job[]): Job[] {
  return [...jobList].sort((a, b) => parseEndDate(b.dates).getTime() - parseEndDate(a.dates).getTime());
}

const api = import.meta.env.VITE_API_URL || "http://localhost:8080/";
const version = 1;
const apiUrl = `${api}v${version}`;

export const useExperience = defineStore("experience", () => {
  const jobs = ref<Job[]>([]);
  const projects = ref<Project[]>([]);
  const awards = ref<Award[]>([]);
  const skills = ref<SkillList>();

  /**
   * Fetch fallback JSON for a specific field
   */
  async function fetchFallback<T>(path: string): Promise<T> {
    const response = await fetch(`/json/${path}.json`);
    return await response.json();
  }

  /**
   * Load portfolio and fallback for missing/empty fields
   */
  async function loadPortfolio() {
    if (
      jobs.value.length &&
      projects.value.length &&
      awards.value.length &&
      skills.value
    )
      return;

    try {
      const response = await fetch(`${apiUrl}/portfolio`);
      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const portfolio = await response.json();

      // Field-level fallback logic
      projects.value =
        Array.isArray(portfolio.projects) && portfolio.projects.length
          ? portfolio.projects
          : await fetchFallback<Project[]>("projects");

      jobs.value =
        Array.isArray(portfolio.jobs) && portfolio.jobs.length
          ? portfolio.jobs
          : await fetchFallback<Job[]>("jobs");

      awards.value =
        Array.isArray(portfolio.awards) && portfolio.awards.length
          ? portfolio.awards
          : await fetchFallback<Award[]>("awards");

      skills.value =
        portfolio.skills && Object.keys(portfolio.skills).length
          ? portfolio.skills
          : await fetchFallback<SkillList>("skills");
    } catch (error) {
      console.warn(
        "Portfolio fetch failed, falling back to all local JSON:",
        error,
      );
      projects.value = await fetchFallback<Project[]>("projects");
      jobs.value = await fetchFallback<Job[]>("jobs");
      awards.value = await fetchFallback<Award[]>("awards");
      skills.value = await fetchFallback<SkillList>("skills");
    }
  }

  async function updateSkills(updatedSkills: Skill[], category: string) {
    const { token } = useAuthStore();
    const categoryKey = category.toLowerCase() as Skill["category"];
    const ordered = updatedSkills.map((skill, i) => ({ ...skill, category: categoryKey, rank: i + 1 }));

    const res = await fetch(`${apiUrl}/skills/${categoryKey}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ordered),
    });

    if (!res.ok) throw new Error("Failed to save skills");

    if (skills.value) {
      skills.value[categoryKey as keyof SkillList] = ordered;
    }
  }

  async function deleteJob(id: number) {
    const { token } = useAuthStore();

    const res = await fetch(`${apiUrl}/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to delete job");

    jobs.value = jobs.value.filter((j) => j.id !== id);
  }

  async function createJob(data: Job) {
    const { token } = useAuthStore();

    const res = await fetch(`${apiUrl}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create job");

    const created: Job = await res.json();
    jobs.value = sortByDate([...jobs.value, created]);
    return created;
  }

  async function updateJob(id: number, updatedJob: Job) {
    const { token } = useAuthStore();

    const res = await fetch(`${apiUrl}/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedJob),
    });

    if (!res.ok) throw new Error("Failed to save job");

    const saved: Job = await res.json();
    const index = jobs.value.findIndex((j) => j.id === id);
    if (index !== -1) {
      jobs.value[index] = saved;
      jobs.value = sortByDate(jobs.value);
    }
  }

  async function createAward(data: Omit<Award, "id">) {
    const { token } = useAuthStore();
    const res = await fetch(`${apiUrl}/awards`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create award");
    const created: Award = await res.json();
    awards.value = [...awards.value, created];
    return created;
  }

  async function updateAward(id: number, data: Award) {
    const { token } = useAuthStore();
    const res = await fetch(`${apiUrl}/awards/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update award");
    const saved: Award = await res.json();
    const index = awards.value.findIndex((a) => a.id === id);
    if (index !== -1) awards.value[index] = saved;
  }

  async function deleteAward(id: number) {
    const { token } = useAuthStore();
    const res = await fetch(`${apiUrl}/awards/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete award");
    awards.value = awards.value.filter((a) => a.id !== id);
  }

  async function reorderAwards(orderedAwards: Award[]) {
    const { token } = useAuthStore();
    const ids = orderedAwards.map((a) => a.id);
    const res = await fetch(`${apiUrl}/awards/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) throw new Error("Failed to reorder awards");
    awards.value = orderedAwards;
  }

  return { jobs, projects, awards, skills, loadPortfolio, updateSkills, updateJob, createJob, deleteJob, createAward, updateAward, deleteAward, reorderAwards };
});
