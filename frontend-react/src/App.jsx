import { Routes, Route, Navigate, BrowserRouter } from "react-router";
import {Chat} from "./pages/Chat";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

export default function App() {
  const {user} = useContext(AuthContext);
  return (
    <>
    <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={user ? <Chat /> : <Login />} />
          <Route path="/register" element={user ? <Chat /> : <Register />} />
          <Route path="/" element={user ? <Chat /> : <Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
