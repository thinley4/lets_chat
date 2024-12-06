import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-black text-white fixed w-full p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="/" className="text-white">
            Chat
          </a>
        </div>
        <div>
          {user ? (
            <div>Welcome{" "}
              {
                user.name.charAt(0).toUpperCase() + user.name.slice(1)
              }
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div>
          {user ? (
            <button onClick={logout} className="text-white ml-4">
              Logout
            </button>
          ) : (
            <>
              <a href="/login" className="text-white">
                Login
              </a>
              <a href="/register" className="text-white ml-4">
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
