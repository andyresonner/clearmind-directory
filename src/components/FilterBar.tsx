'use client'

interface FilterBarProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

const filters = [
  { value: 'all', label: 'All Specialists' },
  { value: 'neurologist', label: 'Neurologist' },
  { value: 'geriatric', label: 'Geriatric Psychiatrist' },
  { value: 'memory', label: 'Memory Care' },
  { value: 'geriatrician', label: 'Geriatrician' },
  { value: 'accepting', label: 'Accepting Patients' },
]

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex gap-3 flex-wrap items-center">
      <span className="text-xs font-medium text-ink-muted uppercase tracking-widest mr-1">Filter by:</span>
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`border text-sm px-4 py-1.5 rounded-full transition-all ${
            activeFilter === f.value
              ? 'bg-teal border-teal text-white'
              : 'border-teal/25 bg-transparent text-ink-soft hover:bg-teal hover:border-teal hover:text-white'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
