import { skills } from '@/lib/local'
import { SkillDesType } from '@/lib/skill'
import useSWR from 'swr'

export function useSkills() {
  return useSWR<SkillDesType>('/api/roco/skill?type=all&pn=1&ps=30', (url) =>
    skills.value
      ? skills.value
      : fetch(url)
          .then((res) => res.json())
          .then((res) => (skills.value = res.data))
  )
}
