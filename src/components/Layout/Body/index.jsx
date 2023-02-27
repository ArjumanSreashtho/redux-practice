import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Tasks from "../../../pages/Tasks";
import UserDetails from "../../../pages/Users/UserDetails";
import ProtectedRoute from "../../ProtectedRoute";
import routePath from "../../../constants/routePath";

export default function Body() {
  return (
    <Container className="mt-3">
      <Routes>
        <Route path={routePath.PROFILE} element={
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        } />
        <Route path={routePath.HOME} element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        } />
      </Routes>
    </Container>
  );
}
