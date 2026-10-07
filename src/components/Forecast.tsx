import type { ForecastItem } from "../types/weather";
import { formatDay, getDailyForecast, getWeatherIcon } from "../utils/weather";

interface Props {
  items: ForecastItem[];
}

function Forecast({ items }: Props) {
  const forecast = getDailyForecast(items);

  return (
    <section className="forecast-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Upcoming</p>
          <h2>5-Day Forecast</h2>
        </div>
        <span>Daily overview</span>
      </div>

      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <article className={`forecast-card ${index === 0 ? "today" : ""}`} key={day.dt}>
            <p className="forecast-day">{index === 0 ? "Today" : formatDay(day.dt)}</p>
            <img
              src={getWeatherIcon(day.weather[0].icon)}
              alt={day.weather[0].description}
              className="weather-icon"
            />
            <strong>{Math.round(day.main.temp)}°</strong>
            <p>{day.weather[0].main}</p>
            <div className="min-max">
              <span>{Math.round(day.max)}°</span>
              <span>{Math.round(day.min)}°</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Forecast;
