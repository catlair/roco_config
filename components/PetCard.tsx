import { PetDesType, setFeatures, setGroupType } from '@/lib/pet'
import {
  CardBody,
  Text,
  Card,
  Image,
  Heading,
  Grid,
  Box,
  Flex,
} from '@chakra-ui/react'

export type PetType = PetDesType['pet'][number]

/**
 * 天赋总和
 */
function getSum(pet: PetType) {
  return pet.sm + pet.fy + pet.mg + pet.mk + pet.wg + pet.sd
}

export default function PetCard({ pet }: { pet: PetType }) {
  return (
    <>
      <Card w={500}>
        <CardBody>
          <Grid
            rowGap={0}
            columnGap={0}
            templateColumns="repeat(8, 1fr)"
            autoRows="auto"
          >
            <Box gridArea="1 / 1 / 2 / 4">
              <Heading color="blue.600" m="4" fontSize="2xl" size="md">
                {pet.name}
              </Heading>
              <Image
                src={`https://res.17roco.qq.com/res/combat/icons/${pet.id}-.png?fileVersion=202011231232`}
                alt={`${pet.name}的图片${pet.id}`}
                borderRadius="lg"
              />
            </Box>
            <Box gridArea="1 / 4 / 2 / 9">
              <Flex wrap={'wrap'}>
                <Text as="span" flexGrow={'1'} minW={'46%'} maxW={'50%'}>
                  编号：{pet.id}
                </Text>
                <Text as="span" flexGrow={'1'} minW={'46%'} maxW={'50%'}>
                  属性：{setFeatures(pet.features)}
                </Text>
                <Text as="span" flexGrow={'1'} minW={'46%'} maxW={'50%'}>
                  身高：{pet.height}
                </Text>
                <Text as="span" flexGrow={'1'} minW={'46%'} maxW={'50%'}>
                  体重：{pet.weight}
                </Text>
                <Text as="span" flexGrow={'1'} minW={'46%'} maxW={'50%'}>
                  颜色：{pet.color}
                </Text>
                <Text as="span" flexGrow={'1'} minW={'46%'} maxW={'50%'}>
                  经验类型：{pet.expType}
                </Text>
                <Text as="span" flexGrow={'1'} minW={'46%'} maxW={'50%'}>
                  组：{setGroupType(pet.group)}
                </Text>
                <Text as="span" flexGrow={'1'} minW={'96%'}>
                  爱好：{pet.interest}
                </Text>
                <Text as="span" flexGrow={'1'} minW={'96%'}>
                  简介：
                  {pet.description}
                </Text>
                <Text as="span" flexGrow={'1'} minW={'96%'}>
                  获得：{pet.getForm}
                </Text>
              </Flex>
            </Box>
            <Box gridArea="2 / 1 / 3 / 9">
              <Grid
                templateColumns="repeat(3, 1fr)"
                templateRows="repeat(3, 1fr)"
                columnGap={0}
                rowGap={0}
              >
                <Text as="span" gridArea="1 / 1 / 2 / 4">
                  总计：{getSum(pet)}
                </Text>
                <Text as="span" gridArea="2 / 1 / 3 / 2">
                  精力：{pet.sm}
                </Text>
                <Text as="span" gridArea="2 / 2 / 3 / 3">
                  物攻：{pet.wg}
                </Text>
                <Text as="span" gridArea="2 / 3 / 3 / 4">
                  防御：{pet.fy}
                </Text>
                <Text as="span" gridArea="3 / 1 / 4 / 2">
                  魔攻：{pet.mg}
                </Text>
                <Text as="span" gridArea="3 / 2 / 4 / 3">
                  魔抗：{pet.mk}
                </Text>
                <Text as="span" gridArea="3 / 3 / 4 / 4">
                  速度：{pet.sd}
                </Text>
              </Grid>
            </Box>
          </Grid>
        </CardBody>
      </Card>
    </>
  )
}
