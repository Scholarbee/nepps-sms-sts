import React from "react";

const Gallery = () => {
  const gallery = [
    "/st1.jpeg",
    "/st2.jpeg",
    "/st5.jpeg",
    "/st4.jpeg",
    "/st3.jpeg",
    "/st7.jpeg",
    "/st6.jpeg",
    "/st8.jpeg",
    "/st9.jpeg",
  ];
  return (
    <section className="gallery">
      <h1>SCHOOL GALLERY</h1>
      <div className="images">
        <div>
          {gallery.slice(0, 3).map((element, index) => (
            <img key={index} src={element} alt="galleryImage" />
          ))}
        </div>
        <div>
          {gallery.slice(3, 6).map((element, index) => (
            <img key={index} src={element} alt="galleryImage" />
          ))}
        </div>
        <div>
          {gallery.slice(6, 9).map((element, index) => (
            <img key={index} src={element} alt="galleryImage" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
