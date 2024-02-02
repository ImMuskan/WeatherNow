import React, { useState } from "react";
import './WeatherApp.css';
import img1 from '../assets/search.png';
import img2 from '../assets/clear.png';
import img3 from '../assets/cloud.png';
import img4 from '../assets/drizzle.png';
import img5 from '../assets/rain.png';
import img6 from '../assets/snow.png';
import img7 from '../assets/wind.png';
import img8 from '../assets/humidity.png';
import img9 from '../assets/scattered.jpg'
import img10 from '../assets/thunderstorm.png';
import back from '../assets/background.jpg'
const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState({
        humidity: "",
        windSpeed: "",
        temperature: "",
        location: "",
        weatherIcon: img3,
    });

    let api_key = "fbb4b2c432b46ac8805e0c3303526d56";

    const getWeatherIcon = (weatherCode) => {
        switch (weatherCode) {
            case "01":
                return img2;
            case "02":
                return img3;
            case "03":
                return img9;
            case "04":
                return img9;
            case "09":
                return img5;
            case "10":
                return img5;
            case "11":
                return img10;
            case "13":
                return img6;
            case "50":
                return img3;
            default:
                return img3;
        }
    };

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        try {
            let response = await fetch(url);
            let data = await response.json();

            if (response.ok) {
                setWeatherData({
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    temperature: data.main.temp,
                    location: data.name,
                    weatherIcon: getWeatherIcon(data.weather[0].icon.substring(0, 2)),
                });
            } else {
                alert(`Error: ${data.message}`);

            }
        } catch (error) {
            console.error('Error during fetching weather data:', error.message);
            alert('Error fetching weather data. Please try again.');
        }
    };

    return (
        <div className="weather-app">
            <img src={back} alt="background" className="background-image" />
            <div className="container">
                <div className="top-bar">
                    <input type="text" className="cityInput" placeholder="Search" />
                    <div className="search-icon" onClick={() => { search() }}><img src={img1} alt="search-icon" /></div>
                </div>
                <div className="weather-image"><img src={weatherData.weatherIcon} alt="weather-icon" /></div>
                <div className="weather-temp">{weatherData.temperature}&deg;C</div>
                <div className="weather-location">{weatherData.location}</div>
                <div className="data-container">
                    <div className="element">
                        <img src={img8} className="icon" alt="humidity-icon" />
                        <div className="data">
                            <div className="humidity-percent">
                                {weatherData.humidity}%
                            </div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={img7} className="icon" alt="wind-icon" />
                        <div className="data">
                            <div className="wind-rate">
                                {weatherData.windSpeed} km/hr
                            </div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
