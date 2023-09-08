import { FcGoogle } from "react-icons/fc";
import { useUserStore } from "../context/user";
import { Navigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utils/firebase";

function Login() {
  const user = useUserStore((u) => u.user);
  if (user) return <Navigate to="/" replace />;
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <h1 className="text-6xl font-bold mt-8">
        Welcome to <span className="text-purple-600">StonksMail</span>
      </h1>
      <p className="mt-3 text-2xl">
        The best way to get prices of your favourite stocks
      </p>
      <div className="flex flex-col items-center justify-center mt-8">
        <button
          type="button"
          onClick={() => {
            signInWithPopup(getAuth(app), new GoogleAuthProvider());
          }}
          className="text-black hover:bg-gray-200 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 bg-gray-300"
        >
          <FcGoogle className="inline-block mr-2" /> Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
