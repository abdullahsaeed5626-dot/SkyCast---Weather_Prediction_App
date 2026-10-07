import { useCallback, useEffect, useState } from "react";
import { CloudSun, RefreshCw, Moon, Sun } from "lucide-react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Highlights from "./components/Highlights";
import {
  getForecastByCoordinates,
  getLocation,
  getWeatherByCoordinates,
} from "./services/weatherApi";
import type {
  CurrentWeather as CurrentWeatherType,
  ForecastItem,
} from "./types/weather";
import "./styles.css";

const DEFAULT_CITY = "Lahore";

function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState<CurrentWeatherType | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Dark / Light mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  const loadWeather = useCallback(async (searchCity: string) => {
    if (!searchCity.trim()) return;

    try {
      setLoading(true);
      setError("");

      const location = await getLocation(searchCity.trim());
      const coordinates = {
        lat: location.lat,
        lon: location.lon,
      };

      const [currentWeather, forecastData] = await Promise.all([
        getWeatherByCoordinates(coordinates),
        getForecastByCoordinates(coordinates),
      ]);

      setWeather(currentWeather);
      setForecast(forecastData.list);
      setCity(location.name);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Unable to load weather data.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(DEFAULT_CITY);
  }, [loadWeather]);

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const coordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };

          const [currentWeather, forecastData] = await Promise.all([
            getWeatherByCoordinates(coordinates),
            getForecastByCoordinates(coordinates),
          ]);

          setWeather(currentWeather);
          setForecast(forecastData.list);
          setCity(currentWeather.name);
        } catch (requestError) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load your location's weather.",
          );
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setError("Location permission was denied. Search for a city instead.");
      },
    );
  };

  const toggleTheme = () => {
    setIsDarkMode((currentMode) => !currentMode);
  };

  return (
    <div className={isDarkMode ? "app-shell dark-mode" : "app-shell"}>
      <header className="topbar">
        <div className="container nav-content">
          <div className="brand">
            <div className="brand-icon">
              <CloudSun size={25} />
            </div>

            <div>
              <h1>SkyCast</h1>
              <span>Weather dashboard</span>
            </div>
          </div>

          <div className="nav-actions">
            {/* Dark / Light mode button */}
            <button
              className="theme-button"
              onClick={toggleTheme}
              title={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>{isDarkMode ? "Light" : "Dark"}</span>
            </button>

            {/* Refresh button */}
            <button
              className="refresh-button"
              onClick={() => loadWeather(city)}
              disabled={loading}
              title="Refresh weather"
            >
              <RefreshCw size={18} className={loading ? "spinning" : ""} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <section className="hero">
          <div>
            <p className="eyebrow">Your daily weather companion</p>

            <h2>Know your weather. Plan your day.</h2>

            <p className="hero-copy">
              Get current conditions, useful weather details, and a five-day
              forecast for any city.
            </p>
          </div>

          <SearchBar
            value={city}
            onChange={setCity}
            onSubmit={() => loadWeather(city)}
            onLocationRequest={handleCurrentLocation}
            loading={loading}
          />
        </section>

        {error && <div className="error-message">{error}</div>}

        {loading && !weather ? (
          <div className="loading-state">Loading weather data...</div>
        ) : weather ? (
          <>
            <CurrentWeather weather={weather} />
            <Highlights weather={weather} />
            <Forecast items={forecast} />
          </>
        ) : null}
      </main>

      <footer className="footer">
        <div className="container">
          <p>SkyCast • Built with React, TypeScript & Axios</p>
          <span>Weather data by OpenWeather</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
