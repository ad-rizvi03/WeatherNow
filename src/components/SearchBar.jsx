import React from 'react'

export default function SearchBar({ value, onChange, onSearch, loading, recentSearches = [], onRecentClick, onRemoveRecent }) {
  return (
    <div>
      <form
        className="flex gap-2"
        onSubmit={e => {
          e.preventDefault()
          onSearch()
        }}
      >
        <input
          className="flex-1 px-4 py-3 rounded-lg focus:outline-none shadow placeholder:text-slate-600"
          placeholder="Enter city name (e.g., London)"
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label="City name"
        />
        <button
          className="px-4 py-3 bg-white/90 rounded-lg font-medium shadow hover:bg-white flex items-center gap-2"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="loader w-4 h-4 inline-block" aria-hidden></span>
          ) : null}
          <span>{loading ? 'Searching...' : 'Search'}</span>
        </button>
      </form>

      {recentSearches && recentSearches.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {recentSearches.map((r, i) => (
            <div key={i} className="flex items-center bg-white/80 rounded-full shadow-sm">
              <button
                onClick={() => onRecentClick && onRecentClick(r)}
                className="text-sm px-3 py-1 rounded-l-full"
              >
                {r}
              </button>
              <button
                onClick={() => onRemoveRecent && onRemoveRecent(r)}
                title="Remove"
                className="px-2 py-1 text-xs text-red-600 rounded-r-full hover:bg-white/90"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
