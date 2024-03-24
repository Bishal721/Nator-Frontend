import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { RESET, forgotPassword } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter your email");
    }

    const userData = {
      email,
    };

    await dispatch(forgotPassword(userData));
    await dispatch(RESET(userData));
  };
  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 mt-36">
      <div className="flex justify-center">
        <AiOutlineMail size={35} color="#999" />
      </div>

      <div className="flex justify-center">
        <h2 className="text-3xl font-medium text-orange-500 ">
          Forget password
        </h2>
      </div>

      <form onSubmit={forgot} className="my-10">
        <div className="flex flex-col space-y-5">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-b-2 focus:border-b-orange-600 hover:shadow"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="w-full py-2 font-medium text-white bg-blue-500 hover:bg-blue-400 rounded-lg border-blue-400 hover:shadow inline-flex space-x-2 items-center justify-center">
            Get Reset Email
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

export default Forgot;
