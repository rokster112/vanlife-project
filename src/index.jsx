import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import "./index.css"
import Vans from "./pages/Vans/Vans"
import VansDetail from "./pages/Vans/VansDetail"
import Layout from "./components/Layout"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostLayout from "./components/HostLayout"
import VansHost from "./pages/Host/VansHost"
import VanSingleDetails from "./pages/Host/VanSingleDetails"
import VanSinglePricing from "./pages/Host/VanSinglePricing"
import VanSinglePhotos from "./pages/Host/VanSinglePhotos"
import VanSingle from "./pages/Host/VanSingle"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import AuthRequired from "./components/AuthRequired"
import Register from "./pages/Register"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VansDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<AuthRequired />}>
            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="vans" element={<VansHost />} />
              <Route path="vans/:id" element={<VanSingle />}>
                <Route index element={<VanSingleDetails />} />
                <Route path="pricing" element={<VanSinglePricing />} />
                <Route path="photos" element={<VanSinglePhotos />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
