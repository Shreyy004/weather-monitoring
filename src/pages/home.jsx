import React, { useState, useEffect } from 'react';
import './home.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Gps from '../components/Gps';
import Ifr from '../components/Ifr'; // Make sure to import the Ifr component
function App() {
  const [preferredLocation, setPreferredLocation] = useState('');

  // Function to receive city from Gps component
  const handleCityUpdate = (cityName) => {
    setPreferredLocation(cityName);
  };

  return (
    <div className="page-wrapper">
      <Header />
      <Sidebar />
      <div className="main-content">
        <Gps onCityUpdate={handleCityUpdate} />
        {/* Middle part is left empty as requested */}
        
        {/* Use the preferredLocation state in the Ifr component */}
        {/* Use the preferredLocation state in the Ifr component */}
        <div className="ifr-container">
          {preferredLocation && <Ifr url={`/prec?city=Coimbatore`} />}
        </div>


      </div>
      <Footer />
    </div>
  );
}

export default App;