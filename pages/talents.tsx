import Layout from '@/components/Layout'
import { useSkills } from '@/http/skills'
import { Table, Image } from '@nextui-org/react'
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
            <Th>图片</Th>
            <Th>描述</Th>
          </Thead>
          <Tbody>
            {data?.talent
              ?.sort((a, b) => b.id - a.id)
              .map((talent) => (
                <Tr key={talent.id}>
                  <Td>{talent.id}</Td>
                  <Td>{talent.name}</Td>
                  <Td>
                    <Image
                      src={`https://res.17roco.qq.com/res/talent/${talent.id}_small.png?fileVersion=202011231232`}
                      alt={`${talent.name}的图片${talent.id}`}
                      height="2rem"
                      style={{ borderRadius: '0.25rem', minWidth: '2rem' }}
                      showSkeleton
                    />
                  </Td>
                  <Td>
                    <p
                      style={{
                        maxWidth: '100%',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {talent.des}
                    </p>
                  </Td>
                </Tr>
              )) || []}
          </Tbody>
        </Table>
      </FullLoading>
    </Layout>
  )
}
