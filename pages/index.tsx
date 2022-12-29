import { PetDesType, setFeatures, setGroupType } from '@/lib/pet'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
} from '@chakra-ui/react'
import { getNewPet } from '@/api/pet'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import ViewPet from '@/components/ViewPet'

export default function Home() {
  const [data, setData] = useState<PetDesType | null>(null)

  useEffect(() => {
    let ignore = false
    function fetchData() {
      if (data) {
        return
      }
      getNewPet().then((res) => {
        const data = res.data
        setGroupType(1, data.groupType)
        setFeatures([], data.property)
        if (!ignore) {
          setData(data)
        }
      })
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [data])

  return (
    <Layout>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>最新宠物信息表</TableCaption>
          <Thead>
            <Tr>
              <Th>编号</Th>
              <Th>名称</Th>
              <Th>图</Th>
              <Th>颜色</Th>
              <Th>系别</Th>
              <Th>获取</Th>
              <Th>描述</Th>
              <Th>详情</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data
              ? data.pet.map((pet) => (
                  <Tr key={pet.id}>
                    <Td>{pet.id}</Td>
                    <Td>{pet.name}</Td>
                    <Td paddingInlineEnd={'unset'}>
                      <Image
                        src={`https://res.17roco.qq.com/res/combat/icons/${pet.id}-.png?fileVersion=202011231232`}
                        alt={`${pet.name}的图片${pet.id}`}
                        borderRadius="lg"
                        boxSize="36px"
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
                ))
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !user.confirmed_at) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
}
