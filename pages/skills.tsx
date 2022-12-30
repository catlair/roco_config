import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Skeleton,
} from '@chakra-ui/react'
import Layout from '@/components/Layout'
import { getPetProperty } from '@/lib/local'
import { useSkills } from '@/api/skills'

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
  const { isLoading, data } = useSkills()

  return (
    <Layout>
      <Skeleton
        startColor="pink.500"
        endColor="orange.500"
        height={isLoading ? '100vh' : 'unset'}
        isLoaded={!isLoading}
      >
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>最新宠物信息表</TableCaption>
            <Thead>
              <Tr>
                <Th>编号</Th>
                <Th>名称</Th>
                <Th>威力</Th>
                <Th>PP数</Th>
                <Th>技能类型</Th>
                <Th>速度</Th>
                <Th>描述</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
                ? data.skill.map((skill) => (
                    <Tr key={skill.id}>
                      <Td>{skill.id}</Td>
                      <Td>{skill.name}</Td>
                      <Td>{skill.power ?? '--'}</Td>
                      <Td>{'pp' + skill.ppMax}</Td>
                      <Td>{getSkillType(skill.property, skill.damageType)}</Td>
                      <Td>{skill.speed + '速'}</Td>
                      <Td whiteSpace="pre-wrap" lineHeight="1.5em">
                        {skill.description}
                      </Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </Skeleton>
    </Layout>
  )
}
