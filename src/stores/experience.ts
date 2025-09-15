import type { Award, Job, Project, SkillList } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExperience = defineStore('experience', () => {
  const jobs = ref<Job[]>([])
  const projects = ref<Project[]>([])
  const awards = ref<Award[]>([])
  const skills = ref<SkillList>()

  // one-time load function
  async function loadAll() {
    if (jobs.value.length && projects.value.length && awards.value.length) return // already loaded

    let response = await fetch('/json/jobs.json')
    jobs.value = await response.json()

    response = await fetch('/json/projects.json')
    projects.value = await response.json()

    response = await fetch('/json/awards.json')
    awards.value = await response.json()

    response = await fetch('/json/skills.json')
    skills.value = await response.json()
  }

  return { jobs, projects, awards, skills, loadAll }
})
