import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFB, logInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginPage:FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(authFB);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/", { replace: true });
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="email"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
      </div>
    </div>
  );
}
export default LoginPage
