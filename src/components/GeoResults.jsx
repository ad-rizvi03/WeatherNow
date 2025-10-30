import React from 'react'

export default function GeoResults({results, onSelect, onCancel}){
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel}></div>
      <div className="bg-white rounded-xl p-4 shadow-lg z-10 max-w-lg w-full">
        <h3 className="text-lg font-semibold mb-2">Multiple matches found — pick one</h3>
        <div className="max-h-60 overflow-auto">
          {results.map((r, i) => (
            <button key={i} onClick={() => onSelect(r)} className="w-full text-left p-3 hover:bg-gray-50 rounded">
              <div className="font-medium">{r.name}{r.admin1 ? `, ${r.admin1}` : ''}{r.country ? `, ${r.country}` : ''}</div>
              <div className="text-sm text-gray-600">Lat {r.latitude.toFixed(2)} • Lon {r.longitude.toFixed(2)}</div>
            </button>
          ))}
        </div>
        <div className="mt-3 text-right">
          <button onClick={onCancel} className="px-3 py-2 rounded bg-gray-100">Cancel</button>
        </div>
      </div>
    </div>
  )
}
