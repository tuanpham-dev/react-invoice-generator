import React, { useEffect, useState } from "react";
import "./header.css";
import { Logout } from "tabler-icons-react";
import { onAuthStateChanged,signOut } from "firebase/auth";
import { authFB } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [c_value, setValue] = useState();

  useEffect(()=>{
    onAuthStateChanged(authFB, (currentUser) => {
      setValue(currentUser);
      if(!currentUser){
        navigate('/login', { replace: true })
      }
    });
  },[])

  const signout = async () => {
    await signOut(authFB);
  };

  return (
    <div>
      <div className="home_container">
        <div className="ct_left">
          <h2 className="fs-30">Invoice Generator</h2>
        </div>
        <div className="right">
          <button onClick={signout}>
            <p>Logout</p>
            <p>
              <Logout
                size={20}
                strokeWidth={1.5}
                className="icon"
              />
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;