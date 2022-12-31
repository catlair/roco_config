import { Loading, Container } from '@nextui-org/react'

export default function FullLoading({
  isLoaded,
  children,
  text,
}: {
  isLoaded: boolean
  children?: React.ReactNode
  text?: string
}) {
  return (
    <Container
      gap={0}
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isLoaded ? (
        children
      ) : (
        <Loading size="xl" color="secondary" textColor="secondary">
          {text || 'Loading...'}
        </Loading>
      )}
    </Container>
  )
}
