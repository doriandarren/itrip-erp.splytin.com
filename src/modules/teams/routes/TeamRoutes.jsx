import { Navigate, Route, Routes } from "react-router";
import { TeamPage, TeamCreatePage, TeamEditPage } from "../pages";

export const TeamRoutes = () => {
  return (
    <Routes>
    
      <Route path="/" element={<TeamPage />} />
      <Route path="create" element={<TeamCreatePage />} />
      <Route path="edit/:id" element={<TeamEditPage />} />
      
    </Routes>
  )
}

