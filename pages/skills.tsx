import { getPetProperty } from '@/lib/local'
import { useSkills } from '@/http/skills'

import { GridColDef, zhCN } from '@mui/x-data-grid'
import { useState } from 'react'
import { StripedDataGrid } from '@/components/StripedDataGrid'
import FullLoading from '@/components/Loading'

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

const columns: GridColDef[] = [
  { field: 'id', headerName: '编号', width: 70 },
  { field: 'name', headerName: '名称', width: 150 },
  {
    field: 'power',
    headerName: '威力',
    width: 150,
    valueGetter: ({ row }) => row.power ?? '--',
  },
  {
    field: 'ppMax',
    headerName: 'PP数',
    width: 150,
  },
  {
    field: 'property',
    headerName: '技能类型',
    width: 230,
    valueGetter: ({ row }) => getSkillType(row.property, row.damageType),
  },
  { field: 'speed', headerName: '速度', width: 120 },
  {
    field: 'description',
    headerName: '描述',
    width: 500,
    renderCell: ({ row }) => <p>{row.description}</p>,
  },
]

export default function Skills() {
  const [pageSize, setPageSize] = useState<number>(10)
  const { loading, data } = useSkills()

  return (
    <>
      <FullLoading isLoaded={!loading}>
        <div style={{ height: '100vh', width: '100%' }}>
          <StripedDataGrid
            rowHeight={140}
            rows={data?.skill || []}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            columns={columns}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 15, 20, 50]}
            localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </FullLoading>
    </>
  )
}
