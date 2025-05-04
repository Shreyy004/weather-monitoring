import React, { useEffect, useState } from 'react';
import './Prec.css';

function Prec() {
  // State management
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Animation states
  const [turbineRotation, setTurbineRotation] = useState(0);
  const [cloudPosition, setCloudPosition] = useState(0);
  const [rainAnimation, setRainAnimation] = useState(0);

  // Extract city from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cityFromUrl = params.get('city');
    if (cityFromUrl) {
      setCity(cityFromUrl);
      fetchWeatherData(cityFromUrl);
    }
  }, []);

  // Animate components
  useEffect(() => {
    // Turbine rotation animation
    const turbineInterval = setInterval(() => {
      setTurbineRotation(prev => (prev + 1) % 360);
    }, 50);
    
    // Cloud movement animation
    const cloudInterval = setInterval(() => {
      setCloudPosition(prev => (prev + 0.1) % 100);
    }, 10);
    
    // Rain animation
    const rainInterval = setInterval(() => {
      setRainAnimation(prev => (prev + 1) % 2);
    }, 800);
    
    return () => {
      clearInterval(turbineInterval);
      clearInterval(cloudInterval);
      clearInterval(rainInterval);
    };
  }, []);

  // Function to fetch weather data
  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: cityName }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  // Get current weather data
  const getCurrentData = () => {
    if (!weatherData || !weatherData.current) {
      return null;
    }
    return weatherData.current;
  };

  // Get value or default
  const getValue = (key, defaultValue) => {
    const current = getCurrentData();
    return current ? current[key] : defaultValue;
  };

  // Get wind direction as text
  const getWindDirectionText = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="container">
      
      {loading && <div className="loading">Loading weather data...</div>}
      {error && <div className="error">{error}</div>}
      
      {weatherData && (
        <div className="dashboard">
          {/* Wind Speed Panel */}
          <div className="panel wind-panel">
            <div className="panel-header">
              <h2>Wind Speed <span className="info-icon">ⓘ</span></h2>
            </div>
            <div className="wind-turbines">
              {[1, 2, 3].map((turbine) => (
                <div key={turbine} className="turbine">
                  <div className="turbine-tower"></div>
                  <div 
                    className="turbine-blades"
                    style={{ transform: `rotate(${turbineRotation + (turbine * 30)}deg)` }}
                  >
                    <div className="blade blade-1"></div>
                    <div className="blade blade-2"></div>
                    <div className="blade blade-3"></div>
                  </div>
                </div>
              ))}
            </div>
            <h1 className="value">{getValue('wind_speed', 0).toFixed(1)} <span className="unit">km/h</span></h1>
            <div className="label">{getWindLabel(getValue('wind_speed', 0))}</div>
            
            <div className="gust-row">
              <div className="gust-container">
                <h3>Gust Speed <span className="info-icon">ⓘ</span></h3>
                <div className="gust-animation">
                  <div className="gust-line"></div>
                  <svg width="24" height="16" viewBox="0 0 24 16">
                    <path 
                      d="M2,8 H18 M18,8 C20,5 22,8 20,10" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeLinecap="round"
                    />
                    <path 
                      d="M15,4 L20,8 L15,12" 
                      stroke="orange" 
                      strokeWidth="3" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="gust-value">{(getValue('wind_speed', 0) * 1.5).toFixed(1)} <span className="unit">m/s</span></div>
              </div>
              
              <div className="direction-container">
                <h3>Direction <span className="info-icon">ⓘ</span></h3>
                <div className="direction-arrow">
                  <svg width="30" height="30" viewBox="0 0 100 100">
                    <path 
                      d="M50,20 L70,60 L50,50 L30,60 Z" 
                      fill="#5d9cec" 
                      transform={`rotate(${getValue('wind_direction', 0)}, 50, 50)`} 
                    />
                  </svg>
                </div>
                <div className="direction-value">{getValue('wind_direction', 0)}° {getWindDirectionText(getValue('wind_direction', 0))}</div>
              </div>
            </div>
            
            <div className="info-text">
              Current wind speed is {getValue('wind_speed', 0).toFixed(1)} km/h in {getValue('city', 'this location')}
            </div>
          </div>
          
          {/* Right side panels container */}
          <div className="right-panels">
            {/* Cloud Cover Panel */}
            <div className="panel cloud-panel">
              <div className="panel-header">
                <h2>Cloud Cover <span className="info-icon">ⓘ</span></h2>
              </div>
              
              <div className="clouds-container">
                <div 
                  className="animated-clouds"
                  style={{ left: `${cloudPosition}%` }}
                ></div>
              </div>
              
              <h1 className="value">{getValue('cloud_cover', 0)}<span className="unit">%</span></h1>
              
              <div className="visibility-container">
                <h3>Visibility <span className="info-icon">ⓘ</span></h3>
                <div className="visibility-value">{getValue('visibility', 0).toFixed(1)} <span className="unit">km</span></div>
              </div>
              
              <div className="info-text">
                Current visibility is {getValue('visibility', 0).toFixed(1)}km with {getValue('cloud_cover', 0)}% cloud coverage
              </div>
            </div>
            
            {/* Precipitation Panel */}
            <div className="panel precipitation-panel">
              <div className="panel-header">
                <h2>Precipitation <span className="info-icon">ⓘ</span></h2>
              </div>
              
              <div className="precipitation-animation">
                <div className="precipitation-cloud">
                  <div className={`rain-drops drops-${rainAnimation}`}></div>
                  <div className="orange-dots">
                    <div className="orange-dot dot-1"></div>
                    <div className="orange-dot dot-2"></div>
                  </div>
                </div>
              </div>
              
              <h1 className="value">{getValue('precipitation', 0).toFixed(1)} <span className="unit">mm</span></h1>
              
              <div className="info-text">
                Current precipitation in {getValue('city', 'this location')} is {getValue('precipitation', 0).toFixed(1)}mm
              </div>
            </div>
            
            {/* Pressure Panel */}
            <div className="panel pressure-panel">
              <div className="panel-header">
                <h2>Pressure <span className="info-icon">ⓘ</span></h2>
              </div>
              
              <div className="pressure-gauge">
                <div className="gauge-background"></div>
                <div className="gauge-needle" style={{ transform: `rotate(${calculatePressureAngle(getValue('pressure', 1013))}deg)` }}></div>
                <div className="gauge-center"></div>
                <div className="gauge-marks">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="gauge-mark" 
                      style={{ transform: `rotate(${i * 30}deg)` }}
                    ></div>
                  ))}
                </div>
                <div className="gauge-values">
                  <span className="gauge-value" style={{ top: '75%', left: '25%' }}>1008</span>
                  <span className="gauge-value" style={{ top: '50%', left: '15%' }}>1010</span>
                  <span className="gauge-value" style={{ top: '25%', left: '25%' }}>1012</span>
                  <span className="gauge-value" style={{ top: '15%', left: '50%' }}>1013</span>
                  <span className="gauge-value" style={{ top: '25%', left: '75%' }}>1014</span>
                  <span className="gauge-value" style={{ top: '50%', left: '85%' }}>1015</span>
                  <span className="gauge-value" style={{ top: '75%', left: '75%' }}>1018</span>
                </div>
              </div>
              
              <h1 className="value">{getValue('pressure', 1013)} <span className="unit">mb</span></h1>
              <div className="pressure-label">{getPressureLabel(getValue('pressure', 1013))}</div>
              
              <div className="pressure-scale">
                <div className="scale-bar">
                  <div className="scale-marker" style={{ left: `${calculatePressureScale(getValue('pressure', 1013))}%` }}></div>
                </div>
              </div>
              
              <div className="info-text">
                Current pressure level is {getValue('pressure', 1013)} mb in {getValue('city', 'this location')}
              </div>
            </div>
            
            {/* Temperature Panel */}
            <div className="panel uv-panel">
              <div className="panel-header">
                <h2>Temperature <span className="info-icon">ⓘ</span></h2>
              </div>
              
              <div className="uv-sun">
                <div className="sun-center"></div>
                <div className="sun-rays"></div>
              </div>
              
              <h2 className="uv-label">Temperature</h2>
              <h1 className="value">{getValue('temperature', 0).toFixed(1)}°C</h1>
              
              <div className="uv-scale">
                <div className="scale-bar">
                  <div className="scale-marker" style={{ left: `${calculateTemperatureScale(getValue('temperature', 0))}%` }}></div>
                </div>
                <div className="scale-label">{getTemperatureLabel(getValue('temperature', 0))}</div>
              </div>
              
              <div className="info-text">
                Current temperature is {getValue('temperature', 0).toFixed(1)}°C with {getValue('humidity', 0)}% humidity
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!weatherData && !loading && !error && (
        <div className="empty-state">
          <h2>Enter a city name to get weather data</h2>
          <p>The dashboard will display wind speed, cloud cover, precipitation, pressure, and temperature information.</p>
        </div>
      )}
    </div>
  );
}

// Helper functions
function getWindLabel(speed) {
  if (speed < 1) return "Calm";
  if (speed < 6) return "Light Air";
  if (speed < 12) return "Light Breeze";
  if (speed < 20) return "Gentle Breeze";
  if (speed < 29) return "Moderate Breeze";
  if (speed < 39) return "Fresh Breeze";
  if (speed < 50) return "Strong Breeze";
  if (speed < 62) return "Near Gale"; 
  if (speed < 75) return "Gale";
  if (speed < 89) return "Strong Gale";
  if (speed < 103) return "Storm";
  if (speed < 118) return "Violent Storm";
  return "Hurricane";
}

function calculatePressureAngle(pressure) {
  // Convert pressure to angle for the gauge needle
  const min = 1008;
  const max = 1018;
  const range = max - min;
  const normalized = Math.min(1, Math.max(0, (pressure - min) / range));
  return -120 + (normalized * 240); // -120 to 120 degrees
}

function calculatePressureScale(pressure) {
  // Convert pressure to a 0-100% scale for the display
  const min = 1000;
  const max = 1030;
  return Math.min(100, Math.max(0, ((pressure - min) / (max - min)) * 100));
}

function getPressureLabel(pressure) {
  if (pressure < 1000) return "Very Low";
  if (pressure < 1010) return "Low";
  if (pressure < 1015) return "Moderate";
  if (pressure < 1020) return "High";
  return "Very High";
}

function calculateTemperatureScale(temp) {
  // Convert temperature to a 0-100% scale for the display
  const min = -10;
  const max = 40;
  return Math.min(100, Math.max(0, ((temp - min) / (max - min)) * 100));
}

function getTemperatureLabel(temp) {
  if (temp < 0) return "Freezing";
  if (temp < 10) return "Cold";
  if (temp < 20) return "Mild";
  if (temp < 30) return "Warm";
  return "Hot";
}

export default Prec;