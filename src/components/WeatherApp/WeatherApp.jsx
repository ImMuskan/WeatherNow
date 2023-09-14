import React from "react";
import './WeatherApp.css'
import img1 from '../assets/search.png';
import img2 from '../assets/clear.png';
import img3 from '../assets/cloud.png';
import img4 from '../assets/drizzle.png';
import img5 from '../assets/rain.png';
import img6 from '../assets/snow.png';
import img7 from '../assets/wind.png';
import img8 from '../assets/humidity.png';


const WeatherApp = () => {
    let api_key="fbb4b2c432b46ac8805e0c3303526d56";
    const search=async()=>{
        const element=document.getElementsByClassName("cityInput");
        if(element[0].value ===""){
            return 0;
        }
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        let response=await fetch(url);
        let data=await response.json();
        const humidity=document.getElementsByClassName("humidity-percent");
        const wind=document.getElementsByClassName("wind-rate");
        const temperature=document.getElementsByClassName("weather-temp");
        const location=document.getElementsByClassName("weather-location");
        humidity[0].innerHTML=data.main.humidity;
        wind[0].innerHTML=data.wind.speed;
        temperature[0].innerHTML=data.main.temp;
        location[0].innerHTML=data.name;
    }

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="search" />
                <div className="search-icon" onClick={()=>{search()}}><img src={img1} /></div>
            </div>
            <div className="weather-image"><img src={img3} /></div>
            <div className="weather-temp">24&deg;C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={img8} className="icon" />
                    <div className="data">
                        <div className="humidity-percent">
                            64%
                        </div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={img7} className="icon" />
                    <div className="data">
                        <div className="wind-rate">
                            18km/hr
                        </div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;