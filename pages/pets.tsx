import { PetDesType, setFeatures, setGroupType } from '@/lib/pet'
import { useRequest } from 'ahooks'
import Layout from '@/components/Layout'
import ViewPet from '@/components/ViewPet'
import { Table, Image } from '@nextui-org/react'
import FullLoading from '@/components/Loading'
const { Header: Thead, Cell: Td, Column: Th, Row: Tr, Body: Tbody } = Table

async function getPet(): Promise<PetDesType> {
  const res = await fetch('/api/roco/pet?type=all&pn=1&ps=10000')
  const json = await res.json()
  const data = json.data
  setGroupType(1, data.groupType)
  return data
}

export default function Pets() {
  const { loading, data } = useRequest(getPet)

  return (
    <Layout>
      <FullLoading isLoaded={!loading} text="宠物数据加载中...">
        <Table aria-labelledby="table">
          <Thead>
            <Th>编号</Th>
            <Th>名称</Th>
            <Th>图</Th>
            <Th>颜色</Th>
            <Th>系别</Th>
            <Th>获取</Th>
            <Th>描述</Th>
            <Th>详情</Th>
          </Thead>
          <Tbody>
            {data?.pet.map((pet) => (
              <Tr key={pet.id}>
                <Td>{pet.id}</Td>
                <Td>{pet.name}</Td>
                <Td>
                  <Image
                    src={`https://res.17roco.qq.com/res/combat/icons/${pet.id}-.png?fileVersion=202011231232`}
                    alt={`${pet.name}的图片${pet.id}`}
                    height="2rem"
                    style={{ borderRadius: '0.25rem' }}
                    showSkeleton
                  />
                </Td>
                <Td>{pet.color}</Td>
                <Td>{setFeatures(pet.features)}</Td>
                <Td>{pet.getForm}</Td>
                <Td>{pet.description}</Td>
                <Td>
                  <ViewPet pet={pet} />
                </Td>
              </Tr>
            )) || []}
          </Tbody>
          <Table.Pagination
            shadow
            noMargin
            align="center"
            rowsPerPage={10}
            onPageChange={(page) => console.log({ page })}
          />
        </Table>
      </FullLoading>
    </Layout>
  )
}
