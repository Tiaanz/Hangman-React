// import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import Main from './components/Main'
import  Header  from './components/Header'

const theme = createTheme({
  typography: {
    fontFamily: ['Shantell Sans'].join(''),
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header/>
        <Main />
      </div>
    </ThemeProvider>
  )
}

export default App
