import Layout from '@/components/Layout'
import { getPetProperty } from '@/lib/local'
import { useSkills } from '@/http/skills'
import { Table } from '@nextui-org/react'
import FullLoading from '@/components/Loading'
const { Header: Thead, Cell: Td, Column: Th, Row: Tr, Body: Tbody } = Table

function getSkillType(property: number, damageType: number) {
  const propertyStr = getPetProperty()[property]
  return propertyStr.padEnd(2, '系') + getDamageType(damageType)
}

function getDamageType(damageType: number) {
  switch (damageType) {
    case 1:
      return '物理'
    case 2:
      return '魔法'
    case 3:
      return '变化'
    default:
      return '未知'
  }
}

export default function Skills() {
  const { loading, data } = useSkills()

  return (
    <Layout>
      <FullLoading isLoaded={!loading} text="技能数据加载中...">
        <Table aria-labelledby="table">
          <Thead>
            <Th>编号</Th>
            <Th>名称</Th>
            <Th>威力</Th>
            <Th>PP数</Th>
            <Th>技能类型</Th>
            <Th>速度</Th>
            <Th>描述</Th>
          </Thead>
          <Tbody>
            {data?.skill.map((skill) => (
              <Tr key={skill.id}>
                <Td>{skill.id}</Td>
                <Td>{skill.name}</Td>
                <Td>{skill.power ?? '--'}</Td>
                <Td>{'pp' + skill.ppMax}</Td>
                <Td>{getSkillType(skill.property, skill.damageType)}</Td>
                <Td>{skill.speed + '速'}</Td>
                <Td>{skill.description}</Td>
              </Tr>
            )) || []}
          </Tbody>
        </Table>
      </FullLoading>
    </Layout>
  )
}
