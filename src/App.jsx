import { Outlet } from "react-router-dom"
import Footer from "./shared/Footer"
import Navbar from "./shared/Navbar"

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App
