import React from "react";
import burgerImage from "../assets/bigbrrrgrrr.png";
import Carousel from "./carousel";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <div className="home-page">
        <div className="home-text">
          <h1>Try our New</h1>
        </div>
        <div className="home-img">
          <img src={burgerImage} alt="BigDouble Brrrgrrr" />
        </div>
        <div className="home-text1">
          <h1>#DoublePattyBrrrgrrr</h1>
        </div>
      </div>
      <div className="carousel-section">
        <Carousel />
      </div>
      <Footer />
    </>
  );
}
