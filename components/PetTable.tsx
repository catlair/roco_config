import { PetDesType, setGroupType, setFeatures } from '@/lib/pet'
import { useRequest } from 'ahooks'
import { GridColDef, GridValueGetterParams, zhCN } from '@mui/x-data-grid'
import { useState } from 'react'
import { Avatar } from '@mui/material'
import { StripedDataGrid } from '@/components/StripedDataGrid'
import FullLoading from '@/components/Loading'

const propCols: GridColDef[] = [
  { field: 'mg', name: '魔攻' },
  { field: 'mk', name: '魔抗' },
  { field: 'wg', name: '物攻' },
  { field: 'fy', name: '防御' },
  { field: 'sm', name: '精力' },
  { field: 'sd', name: '速度' },
].map(({ field, name }) => ({
  field,
  hide: true,
  headerName: name,
  width: 25,
  type: 'number',
  align: 'center',
  headerAlign: 'center',
}))
const columns: GridColDef[] = [
  { field: 'id', headerName: '编号', width: 70 },
  { field: 'name', headerName: '名称', width: 110 },
  {
    field: 'iconSrc',
    headerName: '图',
    width: 80,
    renderCell: ({ row }) => (
      <Avatar
        variant="rounded"
        src={`https://res.17roco.qq.com/res/combat/icons/${row.iconSrc}?fileVersion=202011231232`}
        alt={`${row.name}的图片${row.id}`}
        sx={{ borderRadius: '0.25rem', minWidth: '2rem' }}
      />
    ),
  },
  { field: 'color', headerName: '颜色', width: 80 },
  {
    field: 'fullName',
    headerName: '系别',
    width: 130,
    valueGetter: (params: GridValueGetterParams) =>
      setFeatures(params.row.features),
  },
  {
    field: 'total',
    headerName: '种族值',
    width: 60,
    valueGetter: ({ row }: GridValueGetterParams) =>
      row.mg + row.mk + row.fy + row.wg + row.sd + row.sm,
  },
  {
    field: 'sg',
    hide: true,
    headerName: '双攻',
    width: 30,
    valueGetter: ({ row }: GridValueGetterParams) => row.mg + row.wg,
  },
  ...propCols,
  {
    field: 'getForm',
    headerName: '获取',
    width: 350,
    renderCell({ row }) {
      return <p>{row.getForm}</p>
    },
  },
  {
    field: 'description',
    headerName: '描述',
    width: 500,
    renderCell({ row }) {
      return <p>{row.description}</p>
    },
  },
]

export default function PetTable({ url }: { url: string }) {
  const [pageSize, setPageSize] = useState<number>(12)
  const { loading, data } = useRequest(getPet, {
    cacheKey: 'pet:' + url,
    staleTime: 36000,
  })

  async function getPet(): Promise<PetDesType> {
    const res = await fetch(url)
    const json = await res.json()
    const data = json.data
    setGroupType(1, data.groupType)
    return data
  }

  return (
    <>
      <FullLoading isLoaded={!loading}>
        <div style={{ height: '100vh', width: '100%' }}>
          <StripedDataGrid
            rows={data?.pet || []}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            columns={columns}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 12, 20, 50, 100]}
            localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </FullLoading>
    </>
  )
}
