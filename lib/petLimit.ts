import { PetDesType } from './pet'

interface BaseOptions {
  /** 种族 */
  race: number
  /** 等级 */
  level?: number
  /** 天赋 */
  talent?: number
  /** 努力 */
  effort?: number
  /** 亲密分配 */
  intimacy?: number
  /** 亲密类型是否加成 */
  intimacyType?: boolean
  /** 守护加成 */
  guard?: number
  /** 装备加成 */
  equipment?: number
  /** 性格加成 */
  nature?: number
}

// 生命属性
type HpOptions = Omit<BaseOptions, 'intimacyType' | 'nature'>

// 默认值
type BaseOptionsDefault = Required<Omit<BaseOptions, 'race'>>

// 生命属性默认值
type HpOptionsDefault = Required<Omit<HpOptions, 'race'>>

// 速度属性
type SpeedOptions = Omit<
  BaseOptions,
  'intimacyType' | 'intimacy' | 'equipment' | 'guard'
>

// 速度属性默认值
type SpeedOptionsDefault = Required<Omit<SpeedOptions, 'race'>>

// 默认值
const baseOptions: BaseOptionsDefault = {
  level: 100,
  talent: 31,
  effort: 252,
  intimacy: 20,
  intimacyType: true,
  guard: 50,
  equipment: 90,
  nature: 1,
}

// 生命属性默认值
const hpOptions: HpOptionsDefault = {
  ...baseOptions,
  equipment: 120,
}

// 速度属性默认值
const speedOptions: SpeedOptionsDefault = {
  ...baseOptions,
}
/**
 * 求攻击/魔攻/魔抗/防御极限
 * @param options 选项
 */
export function getBaseProp(options: BaseOptions) {
  const {
    race,
    level,
    talent,
    effort,
    intimacy,
    guard,
    equipment,
    nature,
    intimacyType,
  } = {
    ...baseOptions,
    ...options,
  }
  const intimacyTypeAdd = intimacyType ? 10 + intimacy : intimacy,
    doubleRace = race * 2
  // 左极限 = （种族值 * 2 + 5）* 性格加成
  const leftLimit = Math.floor((doubleRace + 5) * nature)
  // 中间值 = （种族值 * 2 + 天赋值 + 努力值 / 4 * 等级 / 100 + 5）* 性格加成
  const middleValue = Math.floor(
    (doubleRace +
      talent +
      Math.floor((Math.floor(effort / 4) * level) / 100) +
      5) *
      nature
  )
  // 右极限 = 中间值 + （亲密度加成 * 性格加成） + 守护加成 + 装备加成
  const rightLimit = Math.floor(
    middleValue + intimacyTypeAdd * nature + guard + equipment
  )
  return {
    leftLimit,
    middleValue,
    rightLimit,
  }
}

export function getBaseLimit(race: number, nature = 1) {
  return getBaseProp({ race, nature })
}

/**
 * 求生命极限
 * @param options 选项
 */
function getHpProp(options: HpOptions) {
  const { race, level, talent, effort, intimacy, guard, equipment } = {
    ...hpOptions,
    ...options,
  }
  const intimacyTypeAdd = 10 + intimacy
  // 左极限 = 种族值 * 2 + 等级 + 10
  const leftLimit = race * 2 + level + 10
  // 中间值 = 左极限 + 天赋值 + 努力值 / 4 * 等级 / 100
  const middleValue =
    leftLimit + talent + Math.floor((Math.floor(effort / 4) * level) / 100)
  // 右极限 = 中间值 + 亲密度加成 + 守护加成 + 装备加成
  const rightLimit = middleValue + intimacyTypeAdd + guard + equipment
  return {
    leftLimit,
    middleValue,
    rightLimit,
  }
}

export function getHpLimit(race: number) {
  return getHpProp({ race })
}

/**
 * 求速度极限
 * @param options 选项
 *
 */
function getSpeedProp(options: SpeedOptions) {
  const { race, level, talent, effort, nature } = {
    ...speedOptions,
    ...options,
  }
  const doubleRace = race * 2
  // 左极限 = （种族值 * 2 + 5）* 性格加成
  const leftLimit = Math.floor((doubleRace + 5) * nature)
  // 中间值 = 与右极限相同，但天赋努力值为 0
  const middleValue = Math.floor(
    (doubleRace +
      talent +
      Math.floor((Math.floor(effort / 4) * level) / 100) +
      5) *
      nature
  )
  return {
    leftLimit,
    middleValue,
    rightLimit: middleValue,
  }
}

export function getSpeedLimit(race: number, nature = 1) {
  return getSpeedProp({ race, nature })
}

/**
 * 获取双攻极限
 */
export function getDoubleAttackLimit(pets: PetDesType['pet']) {
  const okPets = pets.filter(
    (p) => p.id < 3200 && p.wg + p.mg > 200 && ![385, 435].includes(p.id)
  )

  function getLimit(
    p: PetDesType['pet'][number],
    xg: string,
    natureWg = 1,
    natureMg = 1
  ) {
    const wg = getBaseLimit(p.wg, natureWg).rightLimit
    const mg = getBaseLimit(p.mg, natureMg).rightLimit
    return {
      id: p.id,
      name: p.name,
      double: wg + mg - 290,
      xg,
    }
  }

  const arr1 = okPets.map((p) => getLimit(p, '孤僻/调皮/勇敢', 1.1))
  const arr2 = okPets.map((p) => getLimit(p, '稳重/马虎/冷静', 1, 1.1))
  const arr3 = okPets.map((p) => getLimit(p, '平衡'))
  const arr4 = okPets.map((p) => getLimit(p, '物攻 0.9', 0.9))
  const arr5 = okPets.map((p) => getLimit(p, '魔攻 0.9', 1, 0.9))
  const arr6 = okPets.map((p) => getLimit(p, '固执', 1.1, 0.9))
  const arr7 = okPets.map((p) => getLimit(p, '保守', 0.9, 1.1))

  return [...arr1, ...arr2, ...arr3, ...arr4, ...arr5, ...arr6, ...arr7].sort(
    (a, b) => b.double - a.double || a.id - b.id
  )
}
