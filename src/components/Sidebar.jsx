// src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
function Sidebar() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };
  return (
    <div className="sidebar">
      
      <ul>
        <li onClick={() => handleNavigation('/ranking')}><a>🏆 Ranking</a></li>
        <li onClick={() => handleNavigation('/trend')}><a >📈 Trend Analysis</a></li>
        
        <li onClick={() => handleNavigation('/mapping')}><a>📍 Monitor Multiple Locations</a></li>
        <li onClick={() => handleNavigation('/corelation')}><a>🌐 Corelation</a></li>
        <li onClick={() => handleNavigation('/image')}><a >🖼️ Image Classifier</a></li>
        <li onClick={() => handleNavigation('/forecast')}><a >🌦️ Weather Forecast</a></li>
        <li><a href="http://localhost:3001/"> 💻 3D viewer</a></li>
        <li><a href="http://localhost:3000/">🔔 Notifications</a></li>
        <li><a href="http://localhost:3000/feedback">💬 Feedback</a></li>
        <li><a href="http://127.0.0.1:5005"> 🤖 Weather GPT</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;