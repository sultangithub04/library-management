
import { Outlet } from "react-router"
import Footer from "./home/Footer"
import NavBar from "./home/NavBar"
import Header from "./home/Header"





function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100" >
      <NavBar></NavBar><br />
      <Header></Header>
      <div className="flex-grow container mx-auto p-4">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App