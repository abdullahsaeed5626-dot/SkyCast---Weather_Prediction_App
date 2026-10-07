import type { ForecastItem } from "../types/weather";

export const getWeatherIcon = (icon: string) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;

export const formatDay = (timestamp: number) =>
  new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
    new Date(timestamp * 1000),
  );

export const formatTime = (timestamp: number) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp * 1000));

export const getWindDirection = (degrees: number) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(degrees / 45) % 8];
};

export const getDailyForecast = (items: ForecastItem[]) => {
  const grouped = new Map<string, ForecastItem[]>();

  items.forEach((item) => {
    const key = new Date(item.dt * 1000).toISOString().split("T")[0];
    const existing = grouped.get(key) ?? [];
    grouped.set(key, [...existing, item]);
  });

  return Array.from(grouped.values())
    .slice(0, 5)
    .map((dayItems) => {
      const midday = dayItems.reduce((closest, item) => {
        const closestDistance = Math.abs(
          new Date(closest.dt * 1000).getHours() - 12,
        );
        const itemDistance = Math.abs(new Date(item.dt * 1000).getHours() - 12);
        return itemDistance < closestDistance ? item : closest;
      }, dayItems[0]);

      return {
        ...midday,
        min: Math.min(...dayItems.map((item) => item.main.temp_min)),
        max: Math.max(...dayItems.map((item) => item.main.temp_max)),
      };
    });
};
