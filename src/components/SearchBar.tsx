'use client'

interface SearchBarProps {
  onSearch: (term: string) => void
  searchTerm: string
}

import { useState } from 'react'

export default function SearchBar({ onSearch, searchTerm }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchTerm)
  const [preview, setPreview] = useState('')

  function handleInput(value: string) {
    setInputValue(value)
    setPreview(value.trim() ? `Searching for specialists in ${value.trim()}…` : '')
  }

  function handleSubmit() {
    setPreview('')
    onSearch(inputValue.trim())
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="max-w-xl">
      <div className="bg-white rounded-xl p-2 flex gap-2 shadow-lg shadow-teal/15">
        <input
          type="text"
          placeholder="Enter city, state, or zip code…"
          value={inputValue}
          onChange={e => handleInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border-none outline-none font-sans text-sm px-4 py-3 text-ink bg-transparent placeholder-ink-muted"
        />
        <button
          onClick={handleSubmit}
          className="bg-teal text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-teal-light transition-all hover:-translate-y-px whitespace-nowrap"
        >
          Search Specialists
        </button>
      </div>
      <div
        className="text-sm text-ink-muted mt-2 min-h-5 italic transition-opacity duration-200"
        style={{ opacity: preview ? 1 : 0 }}
        aria-live="polite"
      >
        {preview}
      </div>
    </div>
  )
}
