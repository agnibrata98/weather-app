import { lazy, Suspense } from 'react';
import './App.css'
import Forecast from './components/Forecast'
import { Box, CircularProgress } from '@mui/material';
// import MainWeather from './components/MainWeather'
const MainWeather = lazy(() => import('./components/MainWeather'));

function App() {

  return (
    <>
      <Suspense fallback={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}
            >
              <CircularProgress />
            </Box>}>
        <MainWeather />
        {/* <Forecast /> */}
      </Suspense>
    </>
  )
}

export default App
