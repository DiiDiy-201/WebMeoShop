import React from "react";
import Search from "./Search";

const Banner = ({ src, search, text, text2 }) => {
  return (
    <div>
      <div className="hero-area hero-style-one">
        <div
          style={{
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "absolute",
            inset: " 0",
            zIndex: "-1",
          }}
        ></div>
        <div className="container" style={{ marginTop: "200px" }}>
          <div className="hero-content-wrap">
            <h2>{text}</h2>
            <p>{text2}</p>
            {search === "true" ? <Search /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
