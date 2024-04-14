import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../redux/features/auth/authSlice";
import { FaGoogle } from "react-icons/fa";

const OAuthButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      try {
        dispatch(googleLogin(userData));
        navigate("/profile");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-inherit font-normal border border-solid border-black/30 rounded-md py-2 px-4 w-full flex items-center justify-center"
    >
      <FaGoogle /> &nbsp; <span>Sign in with Google</span>
    </button>
  );
};

export default OAuthButton;
