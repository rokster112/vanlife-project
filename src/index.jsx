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
import HostIncome from "./pages/Host/HostIncome"
import HostReviews from "./pages/Host/HostReviews"
import HostLayout from "./components/HostLayout"
import HostAllVans from "./pages/Host/HostAllVans"
import HostDetails from "./pages/Host/HostDetails"
import HostPricing from "./pages/Host/HostPricing"
import HostPhotos from "./pages/Host/HostPhotos"
import HostVanInfo from "./pages/Host/HostVanInfo"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import AuthRequired from "./components/AuthRequired"
import Register from "./pages/Register"
import HostAddVan from "./pages/Host/HostAddVan"

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
              <Route path="income" element={<HostIncome />} />
              <Route path="reviews" element={<HostReviews />} />
              <Route path="vans" element={<HostAllVans />} />
              <Route path="add" element={<HostAddVan />} />
              <Route path="vans/:id" element={<HostVanInfo />}>
                <Route index element={<HostDetails />} />
                <Route path="pricing" element={<HostPricing />} />
                <Route path="photos" element={<HostPhotos />} />
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
