
import { Outlet } from "react-router"
import Footer from "./home/Footer"
import NavBar from "./home/NavBar"
import Header from "./home/Header"





function App() {
  return (
    <div className="max-w-6xl mx-auto min-h-screen" >
      <NavBar></NavBar><br />
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App