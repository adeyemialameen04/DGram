import { Routes, Route } from "react-router-dom";
import Auth from "./Auth/Auth";
import Home from "../pages/Home/Home";

const AnimatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default AnimatedRoutes;