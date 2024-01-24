import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../redux/features/auth/authSlice";
import { googleLogin } from "../services/authService";
import { useNavigate } from "react-router-dom";
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
        const data = await googleLogin(userData);
        console.log(data);
        dispatch(SET_LOGIN(true));
        dispatch(SET_NAME(data.name));
        navigate("/dashboard");
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
      className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Sign in with Google
    </button>
  );
};

export default OAuthButton;
