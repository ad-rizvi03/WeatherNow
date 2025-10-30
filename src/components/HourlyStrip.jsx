import React from 'react'
import IconForCode from './Icons'

export default function HourlyStrip({hourly, currentTime, hours=12}){
  if (!hourly || !hourly.time) return null
  const times = hourly.time
  // find index of current time
  const idx = times.indexOf(currentTime)
  const start = idx >= 0 ? idx : 0
  const slice = times.slice(start, start + hours)

  return (
    <div className="mt-4 overflow-x-auto -mx-6 px-6">
      <div className="flex gap-3">
        {slice.map((t, i) => {
          const h = new Date(t).getHours()
          const temp = hourly.temperature_2m ? Math.round(hourly.temperature_2m[start + i]) : null
          const code = hourly.weathercode ? hourly.weathercode[start + i] : null
          return (
            <div key={i} className="min-w-[72px] bg-white/70 backdrop-blur rounded-lg p-2 text-center">
              <div className="text-xs text-slate-700">{h}:00</div>
              <div className="w-8 h-8 mx-auto mt-1">
                {code !== null ? <IconForCode code={code} className="w-8 h-8" /> : null}
              </div>
              <div className="text-sm mt-1">{temp !== null ? `${temp}°` : '--'}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
