import React from "react";

const Gallery = () => {
  const gallery = [
    "/std1.jpg",
    "/std2.jpg",
    "/std5.jpg",
    "/std4.jpg",
    "/std3.jpg",
    "/std7.jpg",
    "/std6.jpg",
    "/std8.jpg",
    "/std9.jpg",
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
