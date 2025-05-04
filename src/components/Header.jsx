// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate(); // Initialize useNavigate
  
    // Function to handle navigation
    const handleNavigation = (path) => {
      navigate(path); // Navigate to the specified path
    };
  return (
    <header>
      
      <nav className="navbar">
        <a onClick={() => handleNavigation('/1')}>Home</a>
        <a href="#footer">About</a>
        <a href="#footer">Services</a>
        <a href="#footer">Contact</a>
      </nav>
      <div className="icons">
        <i className="fas fa-bars" id="menu-bars"></i>
        <i className="fas fa-search" id="search-icon"></i>
        <a href="#" className="fas fa-heart"></a>
        
      </div>
    </header>
  );
}

export default Header;