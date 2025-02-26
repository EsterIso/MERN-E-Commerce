import { Box, useColorModeValue} from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import CreatePage from './pages/CreatePage'
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import CartPage from "./pages/CartPage"
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage"
import CheckoutCancelPage from "./pages/CheckoutCancelPage"

function App() {

  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/create" element={<CreatePage />}/>
          <Route path="/cart" element={<CartPage />}/>
          <Route path="/checkout/success" element={<CheckoutSuccessPage />}/>
          <Route path="/checkout/cancel" element={<CheckoutCancelPage />}/>
        </Routes>
      </Box>
    </>
  )
}

export default App
