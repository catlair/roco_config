import Layout from '@/components/Layout'
import { useSkills } from '@/api/skills'
import { Table } from '@nextui-org/react'
import FullLoading from '@/components/Loading'
const { Header: Thead, Cell: Td, Column: Th, Row: Tr, Body: Tbody } = Table

export default function Talents() {
  const { loading, data } = useSkills()

  return (
    <Layout>
      <FullLoading isLoaded={!loading} text="加载血脉数据中...">
        <Table aria-labelledby="table">
          <Thead>
            <Th>编号</Th>
            <Th>名称</Th>
            <Th>描述</Th>
          </Thead>
          <Tbody>
            {data?.talent
              ?.sort((a, b) => b.id - a.id)
              .map((talent) => (
                <Tr key={talent.id}>
                  <Td>{talent.id}</Td>
                  <Td>{talent.name}</Td>
                  <Td>{talent.des}</Td>
                </Tr>
              )) || []}
          </Tbody>
        </Table>
      </FullLoading>
    </Layout>
  )
}
