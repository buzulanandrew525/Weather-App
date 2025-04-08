import { useState } from "react";
import { FadeLoader } from "react-spinners";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setIsLoading(false);
        setWeather(data);
      } else {
        alert("Город не найден");
        setIsLoading(false);
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

      {isLoading ? (
        <FadeLoader color="#000000" height={15} width={5} radius={2} margin={2} />
      ) : (
        weather && (
          <div className="weather">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>Температура: {weather.main.temp}°C</p>
            <p>Влажность: {weather.main.humidity}%</p>
          </div>
        )
      )}
    </div>
  );
}

export default App;
