import { MdPassword } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  RESET,
  logoutUser,
  resetPassword,
} from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  password: "",
  password2: "",
};
const Reset = () => {
  const [formData, setformData] = useState(initialState);
  const { password, password2 } = formData;
  const { resetToken } = useParams();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();
    if (!password || !password2) {
      return toast.error("All Fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least six characters");
    }
    if (password !== password2) {
      return toast.error("Password do not match");
    }
    const userData = {
      password,
      password2,
    };
    await dispatch(resetPassword({ userData, resetToken }));
  };
  useEffect(() => {
    if (isSuccess && message.includes("Reset Successful")) {
      navigate("/login");
      dispatch(logoutUser());
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 mt-36">
      <div className="flex justify-center">
        <MdPassword size={35} color="#999" />
      </div>
      <div className="flex justify-center">
        <h2 className="text-3xl font-medium text-orange-500 ">
          Reset password
        </h2>
      </div>

      <form onSubmit={reset} className="my-5">
        <div className="flex flex-col space-y-5">
          <input
            type="password"
            placeholder="New Password"
            required
            name="password"
            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-b-2 focus:border-b-orange-600 hover:shadow"
            value={password}
            onChange={HandleInputChange}
          />

          <input
            type="password"
            placeholder="Confirm new Password"
            required
            name="password2"
            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-b-2 focus:border-b-orange-600 hover:shadow"
            value={password2}
            onChange={HandleInputChange}
          />

          <button className="w-full py-2 font-medium text-white bg-orange-400 hover:bg-orange-500 rounded-lg border-orange-500 hover:shadow inline-flex space-x-2 items-center justify-center">
            Reset Password
          </button>

          <div className="flex justify-between text-gray-400">
            <p>
              <Link to="/" className="hover:text-gray-600">
                Home
              </Link>
            </p>
            <p>
              <Link to="/login" className="hover:text-gray-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reset;
