import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { EXPRESSION_CATEGORIES, COLOR_MAP } from '../constants/expressions'

const ALL_IDS = EXPRESSION_CATEGORIES.flatMap((c) => c.expressions.map((e) => e.id))
const TOTAL = ALL_IDS.length

export default function ExpressionsTab() {
  const [memorized, setMemorized] = useLocalStorage('toeic_memorized_expressions', [])
  const [selectedCat, setSelectedCat] = useState('all')

  const memorizedSet = new Set(memorized)

  function toggle(id) {
    setMemorized((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const categories =
    selectedCat === 'all'
      ? EXPRESSION_CATEGORIES
      : EXPRESSION_CATEGORIES.filter((c) => c.id === selectedCat)

  const doneCount = memorized.length
  const pct = TOTAL === 0 ? 0 : Math.round((doneCount / TOTAL) * 100)

  return (
    <div>
      {/* Overall progress */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-2 bg-gray-100 rounded-full">
          <div
            className="h-2 bg-gray-700 rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 shrink-0">{doneCount}/{TOTAL} 암기</span>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCat('all')}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            selectedCat === 'all'
              ? 'bg-gray-800 text-white border-gray-800'
              : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
          }`}
        >
          전체
        </button>
        {EXPRESSION_CATEGORIES.map((cat) => {
          const c = COLOR_MAP[cat.color]
          const catDone = cat.expressions.filter((e) => memorizedSet.has(e.id)).length
          const active = selectedCat === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                active ? `${c.chip} ${c.border} border` : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat.label}
              {catDone > 0 && (
                <span className="ml-1 opacity-60">{catDone}/{cat.expressions.length}</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Expression cards */}
      <div className="space-y-6">
        {categories.map((cat) => {
          const c = COLOR_MAP[cat.color]
          const catDone = cat.expressions.filter((e) => memorizedSet.has(e.id)).length
          return (
            <div key={cat.id}>
              {selectedCat === 'all' && (
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.chip}`}>
                    {cat.label}
                  </span>
                  <span className="text-xs text-gray-400">{catDone}/{cat.expressions.length}</span>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {cat.expressions.map((expr) => {
                  const done = memorizedSet.has(expr.id)
                  return (
                    <button
                      key={expr.id}
                      onClick={() => toggle(expr.id)}
                      className={`text-left flex items-start gap-3 p-4 rounded-xl border transition-all ${
                        done
                          ? 'bg-gray-50 border-gray-200 opacity-60'
                          : `bg-white ${c.border} border hover:shadow-sm`
                      }`}
                    >
                      <div className={`mt-1 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        done ? 'bg-gray-700 border-gray-700' : `border-gray-300`
                      }`}>
                        {done && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold leading-snug mb-1 ${done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                          {expr.en}
                        </p>
                        <p className="text-xs text-gray-400">{expr.ko}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
