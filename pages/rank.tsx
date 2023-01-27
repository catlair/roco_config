import { GridColDef, zhCN } from '@mui/x-data-grid'
import { useState } from 'react'
import { StripedDataGrid } from '@/components/StripedDataGrid'
import { useRequest } from 'ahooks'
import FullLoading from '@/components/Loading'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'index', width: 0, hide: true },
  {
    field: 'rank',
    headerName: '排名',
    width: 170,
    type: 'number',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'no',
    headerName: '编号',
    width: 170,
    renderCell(params) {
      return params.row.no
    },
  },
  { field: 'name', headerName: '名称', width: 200 },
  {
    field: 'double',
    headerName: '双攻',
    width: 150,
    type: 'number',
    align: 'center',
    headerAlign: 'center',
  },
  { field: 'xg', headerName: '性格', width: 450 },
  { field: 'tj', headerName: '建议', width: 150 },
]

type RankType = {
  no: number
  rank: number
  name: string
  double: number
  xg: string
  id: number
  tj: string
}

function rankHandle(arr: RankType[]) {
  return arr.map((el, index) => {
    el.no = el.id
    el.id = index
    if (el.double < 800) {
      el.tj = '这什么玩意儿？'
    } else if (el.double < 815) {
      el.tj = '不建议使用'
    } else if (el.double > 850) {
      el.tj = '强烈推荐'
    } else if (el.double >= 821) {
      el.tj = '推荐'
    } else {
      el.tj = '不如烈火战神'
    }
    return el
  })
}

async function getRank() {
  const res = await fetch('/api/roco/rank')
  const json = await res.json()
  if (!json) {
    return []
  }
  return rankHandle(json.data)
}

export default function Rank() {
  const [pageSize, setPageSize] = useState<number>(20)
  const { loading, data } = useRequest(getRank)

  return (
    <FullLoading isLoaded={!loading}>
      <div style={{ height: '100vh', width: '100%' }}>
        <StripedDataGrid
          rows={data || []}
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
