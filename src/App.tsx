import { Outlet } from 'react-router'
import './App.css'
import MobileNav from './components/MobileNav'

function App() {
  return (
    <>
      <MobileNav />
      <Outlet />
    </>
  )
}

export default App
