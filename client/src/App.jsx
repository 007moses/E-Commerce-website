import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Navbar from "./components/NavBar"
import Home from "./Pages/Home"
import Products from "./Pages/Products"
import Electronics from "./Products/Electronics";
import Clothing from "./Products/Clothing";
import Books from "./Products/Books";
import Cart from "./Pages/Cart"
import LoginSignup from "./Pages/LoginSignup"
import Footer from "./components/Footer"



function App() {
  return (
   <BrowserRouter>
   <Navbar/>
   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/electronics" element={<Electronics />} />
        <Route path="/products/clothing" element={<Clothing />} />
        <Route path="/products/books" element={<Books />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />

        {/* <Route path="/products/:id" element={<div>Product Details (TBD)</div>} />
        <Route path="/profile" element={<Profile />} />
        /> */}
      </Routes>
      <Footer/>
   </BrowserRouter>
  )
}

export default App
