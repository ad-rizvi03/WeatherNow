# Weather Now

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/ad-rizvi03/WeatherNow)

Minimal, responsive React app to check the current weather for any city using the Open‑Meteo APIs.

Live demo
- Deployed on Vercel: https://your-vercel-url.vercel.app (replace with your actual Vercel deployment URL)

Features
- Search a city name (uses Open‑Meteo Geocoding API)
- Shows temperature, wind speed, condition icon, last updated time (uses Open‑Meteo Current Weather)
- Loading and error states
- Tailwind CSS styling with subtle gradient background that changes by weather condition
- Temperature unit toggle (°C / °F)

APIs used
- Geocoding: https://geocoding-api.open-meteo.com/v1/search?name={city}
- Weather: https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true

Run locally (Windows PowerShell)
1. Install Node.js (recommended >= 18) from https://nodejs.org
2. Open PowerShell in the project folder (where package.json lives)
3. Install dependencies and start dev server:

```powershell
npm install
npm run dev
```

You should see a Vite dev server URL (e.g. http://localhost:5173) — open it in your browser.

Deploy
- Deployed on Vercel (recommended). You can also use Netlify or GitHub Pages.

Project structure
- `package.json` — scripts and deps
- `index.html` — Vite entry
- `src/main.jsx` — React entry
- `src/App.jsx` — main app logic and state
- `src/components` — UI components
- `src/index.css` — Tailwind base and small custom styles

Design notes
- Clean centered layout, rounded card, soft shadows, and gradient background that shifts according to weather condition.
- Weather code mapping is a simple utility mapping Open‑Meteo weather codes to friendly categories.

Contributing / Next steps
- Update `Live demo` with your real Vercel URL after deploy.
- Consider adding an hourly graph, improved icons, or a PWA manifest for offline usage.
# Weather Now

Minimal, responsive React app to check the current weather for any city using Open-Meteo APIs.

Features
- Search a city name (uses Open-Meteo Geocoding API)
- Shows temperature, wind speed, condition icon, last updated time (uses Open-Meteo Current Weather)
- Loading and error states
- Tailwind CSS styling with subtle gradient background that changes by weather condition
- Temperature unit toggle (°C / °F)

APIs used
- Geocoding: https://geocoding-api.open-meteo.com/v1/search?name={city}
- Weather: https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true

Run locally (Windows PowerShell)
1. Install Node.js (recommended >= 18) from https://nodejs.org
2. Open PowerShell in the project folder (where package.json lives)
3. Install dependencies and start dev server:

```powershell
npm install
npm run dev
```

You should see a Vite dev server URL (e.g. http://localhost:5173) — open it in your browser.

Deploy
- Import the project into CodeSandbox or StackBlitz (choose Vite/React template and upload) — both support Vite + Tailwind projects.

Project structure
- package.json — scripts and deps
- index.html — Vite entry
- src/main.jsx — React entry
- src/App.jsx — main app logic and state
- src/components/SearchBar.jsx — search input and submit
- src/components/WeatherCard.jsx — displays weather information
- src/index.css — Tailwind base and small custom styles

Design notes
- Clean centered layout, rounded card, soft shadows, and gradient background that shifts according to weather condition.
- Weather code mapping is a simple utility mapping Open-Meteo weather codes to friendly categories and emoji.

Next steps / tips
- If you want background animations (rain/snow), add small SVG or CSS animations inside `WeatherCard` keyed by `weather.condition`.
- Improve geocoding result selection (handle multiple matches) by presenting the user a list when multiple results are returned.
