import React from 'react'
import IconForCode from './Icons'
import HourlyStrip from './HourlyStrip'

export default function WeatherCard({ weather, unitC = true, onToggleUnit }) {
  const tempC = weather.temperatureC
  const tempF = Math.round((tempC * 9) / 5 + 32)
  const displayTemp = unitC ? `${Math.round(tempC)} °C` : `${tempF} °F`

  return (
    <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{weather.city}, {weather.country}</h2>
          <p className="text-sm text-slate-700">Lat {weather.latitude.toFixed(2)} • Lon {weather.longitude.toFixed(2)}</p>
        </div>
        <div className="text-4xl animate-bounce w-12 h-12">
          <IconForCode code={weather.weathercode} className="w-12 h-12" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-5xl font-bold">{displayTemp}</div>
          <div className="mt-1 text-sm text-slate-600">Wind: {Math.round(weather.windspeed)} km/h</div>
          {weather.humidity !== null && weather.humidity !== undefined && (
            <div className="mt-1 text-sm text-slate-600">Humidity: {Math.round(weather.humidity)}%</div>
          )}
          {weather.pressure !== null && weather.pressure !== undefined && (
            <div className="mt-1 text-sm text-slate-600">Pressure: {Math.round(weather.pressure)} hPa</div>
          )}
        </div>

        <div className="text-right">
          <div className="text-sm text-slate-600">{weather.condition.toUpperCase()}</div>
          <div className="mt-2">
            <button
              onClick={onToggleUnit}
              className="px-3 py-1 bg-slate-100 rounded-full text-sm shadow"
            >Toggle °C/°F</button>
          </div>
          {weather.winddirection !== undefined && weather.winddirection !== null && (
            <div className="mt-3 flex items-center justify-end gap-2 text-xs text-slate-600">
              <div>Wind dir:</div>
              <div className="w-8 h-8 bg-white/60 rounded-full flex items-center justify-center shadow" title={`${Math.round(weather.winddirection)}°`}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: `rotate(${weather.winddirection}deg)`}}>
                  <path d="M12 2 L15 11 H9 L12 2 Z" fill="#334155" />
                  <circle cx="12" cy="13" r="1.5" fill="#334155" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 text-xs text-slate-600">Last updated: {new Date(weather.time).toLocaleString()}</div>

      {weather.hourly && (
        <HourlyStrip hourly={weather.hourly} currentTime={weather.time} hours={12} />
      )}
    </div>
  )
}
