import { getSkillConfig } from '@/lib/angel'
import { SkillDes, SkillDesType } from '@/lib/skill'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const skillDes = new SkillDes(await getSkillConfig())

  switch (req.query.type) {
    case 'all':
      return getTypeAll()
    case 'talent':
      return res.status(200).json({ data: skillDes.getTalentJSON() })
    case 'skill':
      const skills = skillDes.getSkillJSON()
      return res
        .status(200)
        .json({ data: getPagingPet(skills), total: skills.length })
    case 'prop':
      return res.status(200).json({ data: skillDes.getPropertyJSON() })
    default:
      return getTypeAll()
  }

  function getTypeAll() {
    // 分页
    const data = skillDes.getAllDesJSON(),
      total = data.skill.length,
      skills = getPagingPet(data.skill)
    data.skill = skills
    return res.status(200).json({
      data,
      total,
    })
  }

  /**
   * pet 分页
   */
  function getPagingPet(skills: SkillDesType['skill']) {
    const id = Number(req.query.id)
    if (id) {
      const pet = skills.find((pet) => pet.id === id)
      return pet ? [pet] : []
    }

    const page = Number(req.query.pn) || 1,
      pageSize = Number(req.query.ps) || 20,
      sort = req.query.sort || 'id',
      boss = req.query.boss,
      start = (page - 1) * pageSize

    let tempSkills = boss ? skills : skills.filter((pet) => pet.id < 5000)

    return tempSkills
      .sort((a, b) => {
        switch (sort) {
          case 'id':
            return b.id - a.id
          default:
            return 0
        }
      })
      .slice(start, start + pageSize)
  }
}
