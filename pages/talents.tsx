import { SkillDesType } from '@/lib/skill'

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
import { useSkills } from '@/api/skills'

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

export default function Talents() {
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
            <TableCaption>最新天赋信息表</TableCaption>
            <Thead>
              <Tr>
                <Th>编号</Th>
                <Th>名称</Th>
                <Th>描述</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
                ? data.talent
                    ?.sort((a, b) => b.id - a.id)
                    .map((talent) => (
                      <Tr key={talent.id}>
                        <Td>{talent.id}</Td>
                        <Td>{talent.name}</Td>
                        <Td whiteSpace="pre-wrap" lineHeight="1.5em">
                          {talent.des}
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
