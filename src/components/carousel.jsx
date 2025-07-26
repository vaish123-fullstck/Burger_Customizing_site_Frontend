import React, { useRef, useEffect } from "react";
import "./carousel.css"; // This assumes Carousel.css is in the same folder as carousel.jsx
import image1 from "../assets/placard1.png";
import image2 from "../assets/placard2.png";


const Carousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const autoScroll = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        if (
          carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >=
          carouselRef.current.scrollWidth
        ) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    };

    const interval = setInterval(autoScroll, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel" ref={carouselRef}>
        <div className="card">
          <img src={image1} alt="Burger 1" />
        </div>
        <div className="card">
          <img src={image2} alt="Burger 2" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
