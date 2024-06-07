import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate()
  return (
    <section className="hero">
      <div className="content">
        <div className="title">
          <h1>NEW PARADISE</h1>
          <h1>PREPARATORY</h1>
          <h1>SCHOOL</h1>
        </div>
        <div className="sub-title">
          <p>Where Children Comes First</p>
          <p>Unleash Your Child's Potential</p>
        </div>
        <div className="buttons">
          <button>Apply Now</button>
          <button onClick={()=>{navigate("/student/login");}}>Student Portal</button>
          <button onClick={()=>{navigate("/staff/login");}}>Staff Portal</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
