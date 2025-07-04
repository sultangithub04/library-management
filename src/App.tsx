
import { Outlet } from "react-router"
import Footer from "./home/Footer"
import NavBar from "./home/NavBar"





function App() {
  return (
    <div className="max-w-6xl mx-auto" >
      <NavBar></NavBar><br />
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App