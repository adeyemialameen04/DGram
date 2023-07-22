import './auth.css';
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const Auth = () => {
  const [user, setUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log(auth?.currentUser);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      return (
        <h1>Error signing you out tray again later</h1>
      );
    }
  };

  if (!user) {
    return (
      <main className="auth__main">
        <div className="auth__container container">
          <h1>Welcome to <span>Dgram</span></h1>
          <p>Login to view and add images online</p>
          <button className="siginWithGoogleBtns" onClick={signInWithGoogle}>Login with google</button>
        </div>
      </main>
    );
  }

  return (
    <main className="auth__main">
      <div className="auth__container container">
        <h1>Hi {auth?.currentUser?.displayName}</h1>
        <Link to="/images">Proceed to App</Link>
        <button className="siginWithGoogleBtns" onClick={logout}>SignOut</button>
      </div>
    </main>
  );
};

export default Auth;