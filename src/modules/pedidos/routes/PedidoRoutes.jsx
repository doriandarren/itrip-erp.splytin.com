import { Navigate, Route, Routes } from "react-router";
import { PedidosPage } from "../pages/PedidosPage";


export const PedidoRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={ <PedidosPage /> } />
      
      
      <Route path="/*" element={ <Navigate to="/auth/dashboard" /> } />
      
    </Routes>
  )
}
