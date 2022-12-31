import { skills } from '@/lib/local'
import { SkillDesType } from '@/lib/skill'
import { useRequest } from 'ahooks'

async function getSkills(): Promise<SkillDesType> {
  if (skills.value) {
    return skills.value
  }
  const res = await fetch('/api/roco/skill?type=all&pn=1&ps=30')
  const json = await res.json()
  skills.value = json.data
  return skills.value
}

export function useSkills() {
  return useRequest(getSkills)
}
