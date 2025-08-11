import React from "react";

import image from "../assets/image.png";
import { Link } from "react-router-dom";
import LogoNav from "../components/LogoNav";

const Landing = () => {

  return (
    <div style={{backgroundColor:'#FFFDF3', height:'100dvh'}}>
      <LogoNav/>
     <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // justifyContent: "center",
          // textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", color: "#000E42" }}>
          Welcome to SQI TRUSTBANK
        </h1>
        <p style={{ fontSize: "1.1rem", maxWidth: "500px",}}>
          Your journey to secure, reliable and convenient banking experience.
        </p>

        <div style={{ marginTop: "40px" }}>
          <Link to="/login">
            <button
              style={{
                padding: "12px 30px",
                borderRadius: "5px",
                border: "2px solid #000E42",
                background: "transparent",
                marginRight: "20px",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Link>

          <Link to="/Register">
            <button
              style={{
                padding: "12px 30px",
                borderRadius: "5px",
                border: "none",
                background: "#000E42",
                color: "white",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Register
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;


