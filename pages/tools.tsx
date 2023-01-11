import FullLoading from '@/components/Loading'
import { SortDescriptor, Table } from '@nextui-org/react'
import { useState } from 'react'

export default function Tools() {
  const [list, setList] = useState(new Array(1000).fill(0).map((_, i) => i))
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    direction: 'descending',
    column: 'name',
  })

  async function sort(descriptor: SortDescriptor) {
    if (descriptor.direction === 'descending') {
      setSortDescriptor({
        ...descriptor,
        direction: 'ascending',
      })
      console.log(1, descriptor)
    }
    if (descriptor.direction === 'ascending') {
      setSortDescriptor({
        ...descriptor,
        direction: 'descending',
      })
      console.log(2, descriptor)
    }

    // console.log(descriptor)
    // if (descriptor.direction === 'descending') {
    //   console.log('1', list[0] < list[1])
    //   setList(list.sort((a, b) => (a < b ? 1 : -1)))
    //   descriptor.direction = 'ascending'
    //   setSortDescriptor(descriptor)
    // } else if (descriptor.direction === 'ascending') {
    //   console.log('2', list[0] < list[1])
    //   setList(list.sort((a, b) => (a > b ? 1 : -1)))
    //   descriptor.direction = 'descending'
    //   setSortDescriptor(descriptor)
    //   console.log(descriptor)
    // }
  }
  return (
    <>
      <FullLoading isLoaded={true}>
        <Table
          bordered
          shadow={false}
          color="secondary"
          aria-label="Example pagination  table"
          css={{
            height: 'auto',
            minWidth: '100%',
          }}
          sortDescriptor={sortDescriptor}
          onSortChange={sort}
        >
          <Table.Header>
            <Table.Column key="name" allowsSorting>
              NAME
            </Table.Column>
            <Table.Column key="role">ROLE</Table.Column>
            <Table.Column key="status">STATUS</Table.Column>
          </Table.Header>
          <Table.Body>
            {list.map((_, i) => (
              <Table.Row key={i.toString() + 'i'}>
                <Table.Cell>{i}</Table.Cell>
                <Table.Cell>CEO{i}</Table.Cell>
                <Table.Cell>Active{i}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Pagination
            shadow
            noMargin
            align="center"
            rowsPerPage={12}
            onPageChange={(page) => console.log({ page })}
            contentEditable={true}
          />
        </Table>
      </FullLoading>
    </>
  )
}

// ssr
export async function getServerSideProps() {
  return {
    props: {},
  }
}
