import React from "react";
import { Provider } from "react-redux";

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import routePath from "./constants/routePath";

import store from "./store";

const Layout = React.lazy(() => import("./components/Layout"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Registration = React.lazy(() => import("./pages/Auth/Registration"))

function App() {
  return (
      <Provider store={store}>
        <ToastContainer/>
        <BrowserRouter>
          <Routes>
            <Route path={routePath.LOGIN} element={<Login />} />
            <Route path={routePath.REGISTRATION} element={<Registration />} />
            <Route path={routePath.HOME} element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
