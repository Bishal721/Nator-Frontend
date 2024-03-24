import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./admin/pages/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import Profile from "./pages/profile/Profile";
import { useDispatch } from "react-redux";
import { GetLoginStatus } from "./services/authService";
import { useEffect } from "react";
import axios from "axios";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import Packages from "./pages/Packages/Packages";
import PackageDetail from "./pages/Packages/PackageDetail";
import PrivateRoutes from "./components/protect/PrivateRoutes";
import UpdatePackage from "./admin/pages/packages/UpdatePackage";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus() {
      const status = await GetLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/packages"
          element={
            <Layout>
              <Packages />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/package-details/:id"
          element={
            <Layout>
              <PackageDetail />
            </Layout>
          }
        />
        <Route to={"/admin/update-Packages/:id"} element={UpdatePackage}  />

        <Route element={<PrivateRoutes />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
