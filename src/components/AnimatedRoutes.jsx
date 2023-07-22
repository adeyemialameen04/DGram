import { Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./Auth/Auth";
import Images from "../pages/Images/Images";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import Audio from "../pages/Audio/Audio";

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
      <Route path="/audio" element={<Audio />} />
    </Routes>
  );
};

export default AnimatedRoutes;