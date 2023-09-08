import clsx from "clsx";
import { Link } from "react-router-dom";
import { useUser } from "../../context/user";
import { BiBookAdd } from "react-icons/bi";
function Header() {
  const { username } = useUser((u) => u.user);
  const logout = useUser((u) => u.logOut);
  return (
    <header className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm p-4">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-base md:text-xl font-bold">Task Manager</h1>
        </Link>
      </div>
      <div className="ml-auto">
        <div
          className={clsx("flex flex-row items-center gap-2", {
            hidden: username,
          })}
        >
          <Link to="/auth/login">
            <button
              type="button"
              className="text-black hover:bg-gray-100 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 "
            >
              Login
            </button>
          </Link>
          <Link to="/auth/register">
            <button
              type="button"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Register
            </button>
          </Link>
        </div>
        {username ? (
          <div
            className={clsx("flex flex-row items-center gap-2", {
              hidden: !username,
            })}
          >
            <Link to="/task/create">
              <button
                type="button"
                className="text-black bg-green-100 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 "
              >
                <BiBookAdd className="w-6 h-6" />
              </button>
            </Link>
            <button
              type="button"
              className="text-black bg-gray-100 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={() => {
                localStorage.removeItem("token");
                logout();
                window.location.reload();
              }}
            >
              {username}
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
