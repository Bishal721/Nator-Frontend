import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import { RiProductHuntLine } from "react-icons/ri";
import heroImg from "../../assets/nature.jpg";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
          <RiProductHuntLine size={35} />
        </div>
        <ul className="home-links">
          <li>
            <button className="--btn --btn-green">
              <Link to="/register">Register</Link>
            </button>
          </li>
          <li>
            <button className="--btn --btn-green">
              <Link to="/login">Login</Link>
            </button>
          </li>

          <li>
            <button className="--btn --btn-green">
              <Link to="/dashboard">Dashboard</Link>
            </button>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}

      <section className="container hero">
        <div className="hero-text">
          <h2>
            Tour &amp; Travel <span>Management</span> <span>Solution</span>
          </h2>
          <p>Natour is the one of the best</p>
        </div>
        <div class="hero-image">
          <img src={heroImg} alt="Inventory" />
        </div>
      </section>
    </div>
  );
};

export default Home;
