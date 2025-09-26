import type { Award, Job, Project, SkillList } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

const api = "https://api.bradyshea.dev/";
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
        error
      );
      projects.value = await fetchFallback<Project[]>("projects");
      jobs.value = await fetchFallback<Job[]>("jobs");
      awards.value = await fetchFallback<Award[]>("awards");
      skills.value = await fetchFallback<SkillList>("skills");
    }
  }

  return { jobs, projects, awards, skills, loadPortfolio };
});
