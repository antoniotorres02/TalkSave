import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExpensesPage from './features/expenses-view/ExpensesPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ExpensesPage></ExpensesPage>
    </>
  )
}

export default App
