import { TiUserAddOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validateEmail } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { RESET, registerUser } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import OAuthButton from "../../components/OAuthButton";
import loginimg from "../../assets/Signin.jpg";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
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

    await dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

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
          <TiUserAddOutline size={33} />
          <h1 className="text-3xl font-semibold">&nbsp;Register</h1>
        </div>
        <form onSubmit={UserRegister}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              name="name"
              value={name}
              onChange={HandleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              name="email"
              value={email}
              onChange={HandleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              name="password"
              value={password}
              onChange={HandleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              name="password2"
              value={password2}
              onChange={HandleInputChange}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Register
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
          <p className="text-gray-500">
            &nbsp; Already have an account? &nbsp;
          </p>
          <Link to="/login" className="hover:underline">
            Login Here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
