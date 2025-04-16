import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { DashboardRoutes } from "../modules/dashboard/routes/DashboardRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { startRestoreSession } from "../store/auth/thunks";
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { TeamRoutes } from "../modules/teams/routes/TeamRoutes";
import { ProfileRoutes } from "../modules/profile/routes/ProfileRoutes";
import { PreloaderMain } from "../components/Preloader/PreloaderMain";
import { PedidoRoutes } from "../modules/pedidos/routes/PedidoRoutes";


export const AppRouter = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const isAuthenticated = status === "authenticated";
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    dispatch(startRestoreSession()).finally(() => {
      setCheckingAuth(false);
    });
  }, [dispatch]);

  if (checkingAuth) {
    return <PreloaderMain />
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/auth/*" element={<PublicRoute isAuthenticated={isAuthenticated} />}>
        <Route path="*" element={<AuthRoutes />} />
      </Route>

      {/* Private Routes */}
      <Route path="/admin/*" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="dashboard/*" element={<DashboardRoutes />} />
        <Route path="profile/*" element={<ProfileRoutes />} />
        <Route path="teams/*" element={<TeamRoutes />} />
        <Route path="pedidos/*" element={<PedidoRoutes />} />
      </Route>

      {/* Global Redirection */}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/admin/dashboard" : "/auth/login"} />} />
    </Routes>
  );
}
