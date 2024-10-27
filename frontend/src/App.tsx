import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ExpensesPage from './features/expenses-view/ExpensesPage'
import { ThemeProvider } from './context/ThemeProvider'
import LoginPage from './features/auth/LoginPage' // Asume que crearás este componente

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <main className='min-h-screen bg-background text-foreground'>
          <Routes>
            <Route path="/" element={<ExpensesPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </ThemeProvider>
    </Router>
  )
}

export default App