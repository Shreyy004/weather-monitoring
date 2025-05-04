import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Corelation from './pages/Corelationpage';
import Ranking from './pages/RankingPage';
import Image from './pages/imageclassifier';
import Mapping from './pages/Map';
import Forecasting from './pages/Forecast';
import Trend from './pages/Trendanalysis';
import Login from './Login';
import Prec from './components/Prec';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/1" element={<Home />} />
                <Route path="/corelation" element={<Corelation />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/mapping" element={<Mapping />} />
                <Route path="/image" element={<Image />} />
                <Route path="/forecast" element={<Forecasting />} />
                <Route path="/trend" element={<Trend />} />
                <Route path="/Prec" element={<Prec />}/>
                
            </Routes>
        </Router>
    );
}

export default App;
