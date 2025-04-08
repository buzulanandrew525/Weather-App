import { useState } from "react";
import "./index.css";

const API_KEY = "7f8e81002b7e4ef29e8b195bae65802f"; 

interface WeatherData {
  name: string;
  weather: { description: string }[];
  main: { temp: number; humidity: number };
}

function App() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("Город не найден");
        setWeather(null);
      }
    } catch (error) {
      console.error("Ошибка при получении погоды", error);
    }
  };

  return (
    <div className="app">
      <h1>Погода в городе</h1>
      <input
        type="text"
        value={city}
        placeholder="Введите город"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Узнать погоду</button>

      {weather && (
        <div className="weather">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Температура: {weather.main.temp}°C</p>
          <p>Влажность: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
