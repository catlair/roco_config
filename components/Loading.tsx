import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function FullLoading({
  isLoaded,
  children,
}: {
  isLoaded: boolean
  children: JSX.Element | null
}) {
  return isLoaded ? (
    children
  ) : (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#bdc3c7',
        height: '100vh',
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={90} />
    </Box>
  )
}
