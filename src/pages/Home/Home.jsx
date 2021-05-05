import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import heroImg from "../Home/hero-image.jpg";
import "../Home/Home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <header
      className="hero"
      style={{ background: `url(${heroImg}) no-repeat center center/cover` }}
    >
      <div>
        <Navbar />
      </div>
      <div className="content">
        <h1 className="hero-title">Enhance your financial knowledge</h1>
        <p className="hero-description">
          Get started with managing your finance with wide range of books &
          courses specially curated and suitable for all levels.
        </p>
        <Link to="/products">
          <button className="btn-primary btn-md">Shop Now</button>
        </Link>
      </div>
    </header>
  );
};
