import { type ListItem } from './list'

export type Job = {
  company: string
  icon?: string
  description: string
  dates: string
  details: ListItem[]
  location?: string
  skills?: Array<string>
}
