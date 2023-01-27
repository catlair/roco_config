import { useSkills } from '@/http/skills'
import { GridColDef, GridSortModel, zhCN } from '@mui/x-data-grid'
import { useState } from 'react'
import { Avatar } from '@mui/material'
import { StripedDataGrid } from '@/components/StripedDataGrid'
import FullLoading from '@/components/Loading'

const columns: GridColDef[] = [
  { field: 'id', headerName: '编号', width: 70 },
  { field: 'name', headerName: '名称', width: 150 },
  {
    field: 'iconSrc',
    headerName: '图',
    width: 80,
    renderCell: ({ row }) => (
      <Avatar
        variant="rounded"
        src={`https://res.17roco.qq.com/res/talent/${row.id}_small.png?fileVersion=202011231232`}
        alt={`${row.name}的图片${row.id}`}
        sx={{ borderRadius: '0.25rem', minWidth: '2rem' }}
      />
    ),
  },
  {
    field: 'des',
    headerName: '描述',
    width: 500,
    renderCell: ({ row }) => <p>{row.des}</p>,
  },
]

export default function Talents() {
  const [pageSize, setPageSize] = useState<number>(50)
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'id',
      sort: 'desc',
    },
  ])
  const { loading, data } = useSkills()

  return (
    <>
      <FullLoading isLoaded={!loading}>
        <div style={{ height: '100vh', width: '100%' }}>
          <StripedDataGrid
            rowHeight={140}
            rows={data?.talent || []}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            columns={columns}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 15, 20, 50, 100]}
            localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </FullLoading>
    </>
  )
}
