import { useState } from 'react'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('login')

  return (
    <>
      {currentPage === 'login' ? (
        <Login onNavigateToSignup={() => setCurrentPage('signup')} />
      ) : (
        <Signup onNavigateToLogin={() => setCurrentPage('login')} />
      )}
    </>
  )
}

export default App
