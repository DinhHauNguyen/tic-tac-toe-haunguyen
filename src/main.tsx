import { ThemeProvider, createTheme } from '@mui/material/styles'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import './global.css'

const theme = createTheme({
  typography: {
    fontFamily: 'Fredoka, sans-serif',
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>

  </React.StrictMode>,
)
