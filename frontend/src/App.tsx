import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExpensesPage from './features/expenses-view/ExpensesPage'
import { ThemeProvider } from './context/ThemeProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <main className='min-h-screen bg-background text-foreground'>
          <ExpensesPage></ExpensesPage>
        </main>
      </ThemeProvider>
    </>
  )
}

export default App
