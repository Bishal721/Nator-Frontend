import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import OAuthButton from "../../components/OAuthButton";
import loginimg from "../../assets/Signin.jpg";
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const dispatch = useDispatch();
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
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.name));
      navigate("/profile");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {isLoading && <Loader />}
      <div className="w-1/1 h-screen hidden lg:block">
        <img
          src={loginimg}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <div className="flex items-center  mb-4 text-blue-500">
          <BiLogIn size={33} />
          <h1 className="text-3xl font-semibold">&nbsp;Login</h1>
        </div>
        <form onSubmit={login}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
              value={email}
              onChange={HandleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
              value={password}
              onChange={HandleInputChange}
            />
          </div>

          <div className="mb-6 text-blue-500">
            <Link to="/forgot" className="hover:underline">
              Forgot Password
            </Link>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
          <p className="text-center">or</p>
          <div className="mb-4 flex items-center">
            <OAuthButton />
          </div>
        </form>
        <span className="mt-6 text-blue-500 text-center flex items-center">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <p className="text-gray-500">&nbsp; Don't have an account? &nbsp;</p>
          <Link to="/register" className="hover:underline">
            Sign up Here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
