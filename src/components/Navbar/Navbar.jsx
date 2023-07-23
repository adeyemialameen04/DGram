import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const navigate = useNavigate();
  const [isNavShowing, setIsNavShowing] = useState(false);

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
    <header>
      <div className="container nav__container">
        <Link className="logo" to="/home">
          DGram
        </Link>
        <nav>
          <ul className={`nav__links ${isNavShowing ? "show-nav" : ""}`}>
            <li onClick={() => setIsNavShowing(prev => !prev)}>
              <Link to="/images">Images</Link>
            </li>
            <li onClick={() => setIsNavShowing(prev => !prev)}>
              <Link to="/audios">Audios</Link>
            </li>
            <li onClick={() => setIsNavShowing(prev => !prev)}>
              <Link to="/videos">Videos</Link>
            </li>
            <li onClick={() => setIsNavShowing(prev => !prev)}>
              <button onClick={logout}>
                <AiOutlinePoweroff />
              </button>
            </li>
          </ul>
        </nav>
        <div
          className="nav__btns"
          onClick={() => setIsNavShowing(prev => !prev)}
        >
          <button>
            {
              isNavShowing ? <FaTimes /> : <GiHamburgerMenu />
            }
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;