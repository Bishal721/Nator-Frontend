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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import Packages from "./pages/Packages/Packages";
import PackageDetail from "./pages/Packages/PackageDetail";
import AddPackage from "./admin/pages/packages/addPackage/AddPackage";
import UpdatePackage from "./admin/pages/packages/updatepackage/UpdatePackage";
import HomeLayout from "./components/layout/HomeLayout";
import ErrorPage from "./ErrorPage";
import Hotel from "./pages/hotel/Hotel";
import HotelList from "./pages/hotel/HotelList";
import HotelDetail from "./pages/hotel/HotelDetail";
import AdminLayout from "./admin/components/layout/AdminLayout";
import AddHotel from "./admin/pages/hotel/AddHotel";
import UpdateHotel from "./admin/pages/hotel/UpdateHotel";
import UserList from "./admin/components/userlist/UserList";
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage";
import PaymentUnsuccessfulPage from "./pages/payment/PaymentUnsuccessfulPage";
import BookingPage from "./pages/booking/BookingPage";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  useEffect(() => {
    async function fetch() {
      await dispatch(getLoginStatus());
      if (isLoggedIn && user === null) {
        dispatch(getUser());
      }
    }
    fetch();
  }, [isLoggedIn, user, dispatch, fetch]);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
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
        <Route
          path="/hotels"
          element={
            <HomeLayout>
              <Hotel />
            </HomeLayout>
          }
        />
        <Route
          path="/hotel-list"
          element={
            <Layout>
              <HotelList />
            </Layout>
          }
        />
        <Route
          path="/hotel-detail/:id"
          element={
            <Layout>
              <HotelDetail />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/success" element={<PaymentSuccessPage />} />
        <Route path="/cancel" element={<PaymentUnsuccessfulPage />} />
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
          path="/bookings"
          element={
            <Layout>
              <BookingPage />
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

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-package" element={<AddPackage />} />

          <Route path="edit-packages/:id" element={<UpdatePackage />} />
          <Route path="add-hotels" element={<AddHotel />} />
          <Route path="edit-hotels/:id" element={<UpdateHotel />} />
          <Route path="users" element={<UserList />} />
        </Route>

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
