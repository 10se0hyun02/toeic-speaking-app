export default function PartPanel({ parts, selectedId, onSelect, progressForPart }) {
  return (
    <aside className="w-full md:w-52 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">파트 선택</p>
        </div>
        <ul className="py-1">
          {parts.map((part) => {
            const prog = progressForPart(part.id)
            const isSelected = selectedId === part.id
            return (
              <li key={part.id}>
                <button
                  onClick={() => onSelect(part.id)}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    isSelected
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                      Part {part.number}
                    </span>
                    <span className={`text-xs ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                      {prog.done}/{prog.total}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-tight">{part.title}</p>
                  {prog.total > 0 && (
                    <div className={`mt-2 h-1 rounded-full ${isSelected ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <div
                        className={`h-1 rounded-full transition-all ${isSelected ? 'bg-gray-300' : 'bg-gray-400'}`}
                        style={{ width: `${prog.pct}%` }}
                      />
                    </div>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
