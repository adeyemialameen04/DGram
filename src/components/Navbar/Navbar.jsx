import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      console.log("Signed out successfully");
    } catch (error) {
      return (
        <h1>Error signing you out try again later</h1>
      );
    }
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/home">
          DGram
        </Link>
        <button onClick={logout}>
          <AiOutlinePoweroff />
        </button>
        <Link to="/audio">Audios</Link>
      </div>
    </nav>
  );
};

export default Navbar;