import React, { useState } from "react";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
//   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All Fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least six characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    const userData = {
      email,
      password,
    };
  };
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}

      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2> Login</h2>

          <form>
            <input
              type="email"
              placeholder="Email"
              required
              // name="email"
              // value={email}
              // onChange={HandleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              // name="password"
              // value={password}
              // onChange={HandleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
            <Link to="/forgot">Forgot Password</Link>
          </form>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp; Don't have an account? </p>
            <Link to="/register"> Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
