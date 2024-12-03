import { Routes, Route, Navigate, BrowserRouter } from "react-router";
import {Chat} from "./pages/Chat";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
    <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Chat />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
