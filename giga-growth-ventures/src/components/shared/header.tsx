import clsx from "clsx";
import { Link } from "react-router-dom";
import { app } from "../../utils/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useMemo } from "react";
import { useUserStore } from "../../context/user";
function Header() {
  const auth = useMemo(() => getAuth(app), [app]);
  const user = useUserStore((s) => s.user);
  return (
    <header className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm p-4">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-base md:text-xl font-bold">StonksMail</h1>
        </Link>
      </div>
      <div className="ml-auto">
        <div
          className={clsx("flex flex-row items-center gap-2", {
            hidden: user != null,
          })}
        >
          <button
            type="button"
            onClick={() => {
              signInWithPopup(auth, new GoogleAuthProvider())
                .then(console.log)
                .catch(console.error);
            }}
            className="text-black hover:bg-gray-100 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Login
          </button>
          <button
            type="button"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          >
            Register
          </button>
        </div>
        {user ? (
          <div
            className={clsx("flex flex-row items-center gap-2", {
              hidden: user == null,
            })}
          >
            <button
              type="button"
              className="text-black bg-gray-100 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 "
              onClick={() => {
                auth.signOut().then(console.log).catch(console.error);
              }}
            >
              {user.displayName}
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
