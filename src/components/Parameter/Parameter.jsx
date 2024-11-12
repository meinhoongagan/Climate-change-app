import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTemperature, setAqi, setWindSpeed, setUvRadiation, setHumidity, setEcosystem } from '../../redux/simulatorSlice';
import '../Parameter/Parameter.css';

const Parameter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ecosystem, setEco] = useState('');
    const [temperature, setTemp] = useState('');
    const [aqi, setA] = useState('');
    const [wind_speed, setWind] = useState('');
    const [uv_radiation, setUV] = useState('');
    const [humidity, setHumid] = useState('');

    const handleInputChange1 = (e) => {
        setEco(e.target.value);
    }

    const handleInputChange2 = (e) => {
        setTemp(e.target.value);
    }
    const handleInputChange3 = (e) => {
        setA(e.target.value);
    }
    const handleInputChange4 = (e) => {
        setWind(e.target.value);
    }
    const handleInputChange5 = (e) => {
        setUV(e.target.value);
    }
    const handleInputChange6 = (e) => {
        setHumid(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        dispatch(setEcosystem(ecosystem));  
        dispatch(setTemperature(temperature));
        dispatch(setAqi(aqi));
        dispatch(setWindSpeed(wind_speed));
        dispatch(setUvRadiation(uv_radiation));
        dispatch(setHumidity(humidity));

        navigate(`/${ecosystem}`);
    };

    return (
        <div>
            <header className="header">
                <h1 className="title">Climate Change Impact Simulator</h1>
            </header>

            <div className="form-container">
                <form className="parameter-form" onSubmit={handleSubmit}>
                    <div className="ecosystem-section">
                        <label htmlFor="ecosystem" className="ecosystem-label">Type of Ecosystem</label>
                        <select 
                            id="ecosystem" 
                            className="ecosystem-select"
                            onChange={handleInputChange1}
                        >
                            <option value="urban">Urban</option>
                            <option value="forest">Forest</option>
                            <option value="desert">Desert</option>
                            <option value="mountain">Mountain</option>
                        </select>
                    </div>

                    <div className="parameters-grid">
                        <div className="input-group">
                            <label htmlFor="temperature" className="input-label">Temperature (°C)</label>
                            <input 
                                type="text" 
                                id="temperature" 
                                placeholder="e.g., 25" 
                                className="input-field"
                                onChange={handleInputChange2}
                                value={temperature}
                                required
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="aqi" className="input-label">AQI</label>
                            <input 
                                type="text" 
                                id="aqi" 
                                placeholder="e.g., 50" 
                                className="input-field"
                                onChange={handleInputChange3}
                                value={aqi}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="wind-speed" className="input-label">Wind Speed (km/h)</label>
                            <input 
                                type="text" 
                                id="wind-speed" 
                                placeholder="e.g., 15" 
                                className="input-field"
                                onChange={handleInputChange4}
                                value={wind_speed}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="uv-rays" className="input-label">UV Rays</label>
                            <input 
                                type="text" 
                                id="uv-rays" 
                                placeholder="e.g., 3" 
                                className="input-field"
                                onChange={handleInputChange5}
                                value={uv_radiation}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="humidity" className="input-label">Humidity (%)</label>
                            <input 
                                type="text" 
                                id="humidity" 
                                placeholder="e.g., 60" 
                                className="input-field"
                                onChange={handleInputChange6}
                                value={humidity}
                                required
                            />
                        </div>
                    </div>

                    <button className="submit-button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Parameter