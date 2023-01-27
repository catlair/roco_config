import { GridColDef, zhCN } from '@mui/x-data-grid'
import { useState } from 'react'
import { StripedDataGrid } from '@/components/StripedDataGrid'
import { useRequest } from 'ahooks'
import FullLoading from '@/components/Loading'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: '编号',
    width: 170,
    type: 'number',
    align: 'center',
    headerAlign: 'center',
  },
  { field: 'content', headerName: '名称', width: 350 },
  { field: 'sceneId', headerName: '地图id', width: 150 },
  { field: 'npcX', headerName: 'npc甲', width: 150 },
  { field: 'npcY', headerName: 'npc乙', width: 150 },
  { field: 'time', headerName: '时间', width: 450 },
  { field: 'autoStart', headerName: 'auto', width: 150, hide: true },
]

async function getActive() {
  const res = await fetch('/api/roco/active')
  const json = await res.json()
  return json.data
}

export default function Active() {
  const [pageSize, setPageSize] = useState<number>(20)
  const { loading, data } = useRequest(getActive)

  return (
    <FullLoading isLoaded={!loading}>
      <div style={{ height: '100vh', width: '100%' }}>
        <StripedDataGrid
          rows={data}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          columns={columns}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 15, 20, 50, 100]}
          localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </FullLoading>
  )
}
