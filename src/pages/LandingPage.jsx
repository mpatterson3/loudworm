import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import wormMascot from '../assets/worm-mascot.png';

function LandingPage() {
  return (
    <div className="landing-page d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="hero-section text-center bg-secondary bg-opacity-75 p-5 rounded">
        <img src={wormMascot} alt="Loudworm Mascot" className="mascot-image mb-4" />
        <h1 className="display-4 mb-3">Welcome to Our Store</h1>
        <p className="lead mb-4">Shop the best cannabis products online.</p>
        <div className="d-flex justify-content-center gap-3">
          <a href="/login" className="btn btn-primary">Login</a>
          <a href="/signup" className="btn btn-success">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;