import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import Logo from './components/Logo'
import GeoResults from './components/GeoResults'

/*
  App.jsx — main logic
  - Manages search, fetches geocoding and current weather from Open-Meteo
  - Handles loading, error, and unit toggle
*/

const GEO_API = 'https://geocoding-api.open-meteo.com/v1/search?name='
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

function mapWeatherCode(code) {
  // Map Open-Meteo weather codes to a simple condition key
  if (code === 0) return 'sunny'
  if ([1, 2, 3].includes(code)) return 'cloudy'
  if ([45, 48].includes(code)) return 'fog'
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain'
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snow'
  if (code >= 95) return 'thunder'
  return 'cloudy'
}

export default function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [unitC, setUnitC] = useState(true)
  const [recent, setRecent] = useState([])
  const [geoOptions, setGeoOptions] = useState(null)

  useEffect(() => {
    // Load recent searches from localStorage
    try {
      const raw = localStorage.getItem('recentCities')
      if (raw) setRecent(JSON.parse(raw))
    } catch (e) {
      // ignore
    }
  }, [])

  const handleSearch = async (city) => {
    if (!city || !city.trim()) {
      setError('Please enter a city name')
      setWeather(null)
      return
    }

    setError('')
    setLoading(true)
    setWeather(null)

    try {
      // 1) Geocoding
      const geoRes = await fetch(GEO_API + encodeURIComponent(city))
      if (!geoRes.ok) throw new Error('Geocoding request failed')
      const geoJson = await geoRes.json()
      if (!geoJson.results || geoJson.results.length === 0) {
        setError('City not found')
        setLoading(false)
        return
      }

      if (geoJson.results.length > 1) {
        // let user pick the correct place
        setGeoOptions(geoJson.results)
        setLoading(false)
        return
      }

      // Pick first (only) result
      const place = geoJson.results[0]
      await fetchWeatherForPlace(place)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch weather. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const fetchWeatherForPlace = async (place) => {
    setError('')
    setLoading(true)
    try {
      const lat = place.latitude
      const lon = place.longitude
      // request hourly arrays for forecast details
      const weatherUrl = `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m,pressure_msl&timezone=auto`
      const wRes = await fetch(weatherUrl)
      if (!wRes.ok) throw new Error('Weather request failed')
      const wJson = await wRes.json()
      if (!wJson.current_weather) throw new Error('No current weather data')

      const code = wJson.current_weather.weathercode
      const condition = mapWeatherCode(code)

      // find matching index
      let humidity = null
      let pressure = null
      try {
        if (wJson.hourly && wJson.hourly.time) {
          const idx = wJson.hourly.time.indexOf(wJson.current_weather.time)
          if (idx >= 0) {
            humidity = wJson.hourly.relativehumidity_2m ? wJson.hourly.relativehumidity_2m[idx] : null
            pressure = wJson.hourly.pressure_msl ? wJson.hourly.pressure_msl[idx] : null
          }
        }
      } catch (e) {
        // ignore
      }

      const winddirection = wJson.current_weather.winddirection

      setWeather({
        city: place.name,
        country: place.country,
        latitude: lat,
        longitude: lon,
        temperatureC: wJson.current_weather.temperature,
        windspeed: wJson.current_weather.windspeed,
        winddirection,
        humidity,
        pressure,
        weathercode: code,
        condition,
        time: wJson.current_weather.time,
        hourly: wJson.hourly
      })

      // update recent searches (unique, keep latest 5)
      try {
        setRecent(prev => {
          const normalized = place.name + (place.country ? `, ${place.country}` : '')
          const next = [normalized, ...prev.filter(p => p !== normalized)].slice(0, 5)
          localStorage.setItem('recentCities', JSON.stringify(next))
          return next
        })
      } catch (e) {
        // ignore storage errors
      }
    } catch (err) {
      console.error(err)
      setError('Failed to fetch weather. Try again.')
    } finally {
      setLoading(false)
      setGeoOptions(null)
    }
  }

  function handleGeoSelect(place) {
    // user selected a specific geocoding result
    fetchWeatherForPlace(place)
  }

  function handleGeoCancel() {
    setGeoOptions(null)
  }

  const bgMap = {
    sunny: 'from-yellow-400 via-orange-300 to-rose-200',
    cloudy: 'from-slate-300 via-slate-400 to-slate-500',
    rain: 'from-blue-400 via-indigo-500 to-sky-700',
    snow: 'from-blue-100 via-slate-100 to-white',
    thunder: 'from-purple-600 via-indigo-700 to-slate-800',
    fog: 'from-gray-300 via-gray-400 to-gray-500'
  }

  const currentBg = weather ? bgMap[weather.condition] || bgMap.cloudy : 'from-indigo-500 via-purple-500 to-pink-500'

  return (
    <div className={`relative min-h-screen flex items-center justify-center bg-gradient-to-br ${currentBg} transition-all duration-700`}> 
      {/* overlays for weather animations */}
      {weather && weather.condition === 'rain' && <div className="rain-overlay" />}
      {weather && weather.condition === 'snow' && <div className="snow-overlay" />}
      {weather && weather.condition === 'sunny' && <div className="sun-overlay" />}

      <div className="max-w-md w-full p-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Logo className="app-logo" />
          <h1 className="text-center text-3xl font-semibold text-white drop-shadow">Weather Now</h1>
        </div>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={() => handleSearch(query)}
          loading={loading}
          recentSearches={recent}
          onRecentClick={(r) => {
            setQuery(r)
            handleSearch(r)
          }}
          onRemoveRecent={(r) => {
            try {
              const next = recent.filter(x => x !== r)
              setRecent(next)
              localStorage.setItem('recentCities', JSON.stringify(next))
            } catch (e) {}
          }}
        />

        {error && (
          <div className="mt-4 text-red-900 bg-red-100 p-3 rounded">{error}</div>
        )}

        {weather && (
          <WeatherCard
            weather={weather}
            unitC={unitC}
            onToggleUnit={() => setUnitC(u => !u)}
          />
        )}

        <p className="mt-6 text-sm text-white/90 text-center">Data from Open-Meteo • Geocoding by Open-Meteo</p>
      </div>

      {geoOptions && (
        <GeoResults results={geoOptions} onSelect={handleGeoSelect} onCancel={handleGeoCancel} />
      )}
    </div>
  )
}
