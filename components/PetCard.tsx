import { PetDesType, setFeatures, setGroupType } from '@/lib/pet'
import { Text, Grid, Card, Image } from '@nextui-org/react'

export type PetType = PetDesType['pet'][number]

/**
 * 天赋总和
 */
function getSum(pet: PetType) {
  return pet.sm + pet.fy + pet.mg + pet.mk + pet.wg + pet.sd
}

const textStyles = { flexGrow: 1, minWidth: '46%', maxWidth: '50%' }

export default function PetCard({ pet }: { pet: PetType }) {
  return (
    <>
      <Card style={{ width: '500px' }}>
        <Card.Body>
          <Grid
            style={{
              gridRowGap: 0,
              gridColumnGap: 0,
              gridTemplateColumns: 'repeat(8, 1fr)',
              gridAutoRows: 'auto',
            }}
          >
            <div style={{ gridArea: '1 / 1 / 2 / 4' }}>
              <Text
                style={{
                  color: '#3498db',
                  margin: '4px',
                  fontSize: '1.6rem',
                  fontWeight: 'bold',
                }}
              >
                {pet.name}
              </Text>
              <Image
                src={`https://res.17roco.qq.com/res/combat/icons/${pet.id}-.png?fileVersion=202011231232`}
                alt={`${pet.name}的图片${pet.id}`}
                style={{ borderRadius: '0.25rem' }}
                width={60}
              />
            </div>
            <div style={{ gridArea: '1 / 4 / 2 / 9' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Text as="span" style={textStyles}>
                  编号：{pet.id}
                </Text>
                <Text as="span" style={textStyles}>
                  属性：{setFeatures(pet.features)}
                </Text>
                <Text as="span" style={textStyles}>
                  身高：{pet.height}
                </Text>
                <Text as="span" style={textStyles}>
                  体重：{pet.weight}
                </Text>
                <Text as="span" style={textStyles}>
                  颜色：{pet.color}
                </Text>
                <Text as="span" style={textStyles}>
                  经验类型：{pet.expType}
                </Text>
                <Text as="span" style={textStyles}>
                  组：{setGroupType(pet.group)}
                </Text>
                <Text as="span" style={{ flexGrow: 1, minWidth: '96%' }}>
                  爱好：{pet.interest}
                </Text>
                <Text as="span" style={{ flexGrow: 1, minWidth: '96%' }}>
                  简介：
                  {pet.description}
                </Text>
                <Text as="span" style={{ flexGrow: 1, minWidth: '96%' }}>
                  获得：{pet.getForm}
                </Text>
              </div>
            </div>
            <div style={{ gridArea: '2 / 1 / 3 / 9' }}>
              <Grid
                style={{
                  gridRowGap: 0,
                  gridColumnGap: 0,
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gridTemplateRows: 'repeat(3, 1fr)',
                }}
              >
                <Text as="span" style={{ gridArea: '1 / 1 / 2 / 4' }}>
                  总计：{getSum(pet)}
                </Text>
                <Text as="span" style={{ gridArea: '2 / 1 / 3 / 2' }}>
                  精力：{pet.sm}
                </Text>
                <Text as="span" style={{ gridArea: '2 / 2 / 3 / 3' }}>
                  物攻：{pet.wg}
                </Text>
                <Text as="span" style={{ gridArea: '2 / 3 / 3 / 4' }}>
                  防御：{pet.fy}
                </Text>
                <Text as="span" style={{ gridArea: '3 / 1 / 4 / 2' }}>
                  魔攻：{pet.mg}
                </Text>
                <Text as="span" style={{ gridArea: '3 / 2 / 4 / 3' }}>
                  魔抗：{pet.mk}
                </Text>
                <Text as="span" style={{ gridArea: '3 / 3 / 4 / 4' }}>
                  速度：{pet.sd}
                </Text>
              </Grid>
            </div>
          </Grid>
        </Card.Body>
      </Card>
    </>
  )
}
