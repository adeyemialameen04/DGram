import { Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./Auth/Auth";
import Images from "../pages/Images/Images";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import Audios from "../pages/Audio/Audios";
import Videos from "../pages/Videos/Videos";

const AnimatedRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/images" element={<Images />} />
      <Route path="/audios" element={<Audios />} />
      <Route path="/videos" element={<Videos />} />
    </Routes>
  );
};

export default AnimatedRoutes;