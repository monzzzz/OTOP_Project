// use props to import the data from database or other files
import React from "react";
import "../../../Assets/style/Main/Carousel-Screen/Large_Device_Carousel.css";
export default function Large_Device_Carousel({ data }) {
  return (
    <div
      id="myCarousel"
      className="carousel slide carousel-container"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {data.map((image, index) => (
          <div
            key={index}
            className={`carousel-item${index === 0 ? " active" : ""} px-5 py-4`}
          >
            <img
              src={image.image}
              alt={image.title}
              className="d-block w-100 rounded-5 picture-carousel"
            />
            <div className="carousel-caption">
              <h2>{image.title}</h2>
              <p>{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
