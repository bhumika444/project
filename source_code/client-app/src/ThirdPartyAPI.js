// ThirdPartyAPI.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '028213dc94dc77874687f4c3a3f7bef9';
const cities = [
    'London', 'New York', 'Tokyo', 'Paris', 'Berlin', 
    'Sydney', 'Singapore', 'Dubai', 'Moscow', 'Istanbul', 
    'Shanghai', 'Los Angeles', 'Mexico City', 'Mumbai', 
    'São Paulo', 'Cairo', 'Delhi', 'Jakarta', 'Seoul', 
    'Beijing', 'Lagos', 'Osaka', 'Manila', 'Karachi'
  ];

function ThirdPartyAPI() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const weatherDataPromises = cities.map(async (city) => {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(URL);
        const { temp, humidity } = response.data.main;
        return {
          city,
          temperature: `${temp}°C`,
          humidity: `${humidity}%`
        };
      });
      const data = await Promise.all(weatherDataPromises);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="text-center">
      <h2>Weather Data from Third-Party API</h2>
      <table className="table">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((weather) => (
            <tr key={weather.city}>
              <td>{weather.city}</td>
              <td>{weather.temperature}</td>
              <td>{weather.humidity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ThirdPartyAPI;
