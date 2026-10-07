import {
  Droplets,
  Gauge,
  Eye,
  Navigation,
  Wind,
} from "lucide-react";
import type { CurrentWeather as CurrentWeatherType } from "../types/weather";
import { getWeatherIcon, getWindDirection } from "../utils/weather";

interface Props {
  weather: CurrentWeatherType;
}

function CurrentWeather({ weather }: Props) {
  const condition = weather.weather[0];

  return (
    <section className="current-weather card">
      <div className="current-header">
        <div>
          <p className="eyebrow">Current weather</p>
          <h2>
            {weather.name}, {weather.country}
          </h2>
          <p className="date-text">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            }).format(new Date())}
          </p>
        </div>
        <div className="condition-pill">{condition.main}</div>
      </div>

      <div className="temperature-row">
        <img
          src={getWeatherIcon(condition.icon)}
          alt={condition.description}
          className="weather-icon-large"
        />
        <div>
          <div className="temperature">
            {Math.round(weather.main.temp)}<span>°C</span>
          </div>
          <p className="description">{condition.description}</p>
          <p className="feels-like">
            Feels like {Math.round(weather.main.feels_like)}°C
          </p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <Droplets />
          <span>Humidity</span>
          <strong>{weather.main.humidity}%</strong>
        </div>
        <div className="detail-item">
          <Wind />
          <span>Wind</span>
          <strong>{weather.wind.speed.toFixed(1)} m/s</strong>
        </div>
        <div className="detail-item">
          <Navigation style={{ transform: `rotate(${weather.wind.deg}deg)` }} />
          <span>Direction</span>
          <strong>{getWindDirection(weather.wind.deg)}</strong>
        </div>
        <div className="detail-item">
          <Gauge />
          <span>Pressure</span>
          <strong>{weather.main.pressure} hPa</strong>
        </div>
        <div className="detail-item">
          <Eye />
          <span>Visibility</span>
          <strong>{(weather.visibility / 1000).toFixed(1)} km</strong>
        </div>
      </div>
    </section>
  );
}

export default CurrentWeather;
