import { Cloud, Sunrise, Sunset, ThermometerSun } from "lucide-react";
import type { CurrentWeather } from "../types/weather";
import { formatTime } from "../utils/weather";

interface Props {
  weather: CurrentWeather;
}

function Highlights({ weather }: Props) {
  return (
    <section className="highlights-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Weather details</p>
          <h2>Today’s Highlights</h2>
        </div>
      </div>

      <div className="highlights-grid">
        <div className="highlight-card">
          <ThermometerSun />
          <div>
            <span>High / Low</span>
            <strong>
              {Math.round(weather.main.temp_max)}° / {Math.round(weather.main.temp_min)}°
            </strong>
          </div>
        </div>
        <div className="highlight-card">
          <Cloud />
          <div>
            <span>Cloud cover</span>
            <strong>{weather.clouds.all}%</strong>
          </div>
        </div>
        <div className="highlight-card">
          <Sunrise />
          <div>
            <span>Sunrise</span>
            <strong>{formatTime(weather.sys.sunrise)}</strong>
          </div>
        </div>
        <div className="highlight-card">
          <Sunset />
          <div>
            <span>Sunset</span>
            <strong>{formatTime(weather.sys.sunset)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlights;
