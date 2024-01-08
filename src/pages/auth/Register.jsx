import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import OAuthButton from "../../components/OAuthButton";
const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { name, email, password, password2 } = formData;
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const UserRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("All Fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least six characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Password do not match");
    }
    const userData = {
      name,
      email,
      password,
    };

    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2> Register</h2>

          <form onSubmit={UserRegister}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={HandleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={HandleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={HandleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="password2"
              value={password2}
              onChange={HandleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>

            <p>or</p>
            <OAuthButton />
          </form>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp; Already have an account? </p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
