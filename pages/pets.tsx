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
  Skeleton,
} from '@chakra-ui/react'
import useSWR from 'swr'
import Layout from '@/components/Layout'
import ViewPet from '@/components/ViewPet'

export default function Pets() {
  const { isLoading, data } = useSWR<PetDesType>(
    '/api/roco/pet?type=all&pn=1&ps=12',
    (url) =>
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          const data = res.data
          setGroupType(1, data.groupType)
          return data
        })
  )

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
      </Skeleton>
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
