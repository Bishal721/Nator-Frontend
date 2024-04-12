import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../services/authService";

const isAdminRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let isLoggedIn;
    let user;
    const redirectLoggedOutUser = async () => {
      try {
        isLoggedIn = await authService.GetLoginStatus();
      } catch (error) {
        console.log(error.message);
      }
      if (!isLoggedIn) {
        toast.info("Session expired, please login to continue");
        navigate("/login");
        return;
      }
      try {
        user = await authService.GetUser();
      } catch (error) {
        console.log(error.message);
      }
      console.log(user.role);
      if (user.role !== "admin") {
        toast.info("Unauthorized User");
        navigate("/");
      }
    };
    redirectLoggedOutUser();
  }, [navigate]);
};

export default isAdminRedirect;
