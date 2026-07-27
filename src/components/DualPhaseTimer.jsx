export default function DualPhaseTimer({ timer, onStart, className = '' }) {
  const { phase, display, seconds, running, start, pause, skip, reset } = timer

  const urgent = seconds <= 10 && seconds > 0

  const phaseLabel = phase === 'prep' ? '준비 중' : phase === 'response' ? '답변 중' : '완료'
  const phaseColor =
    phase === 'prep'
      ? urgent ? 'text-red-500' : 'text-amber-500'
      : phase === 'response'
        ? urgent ? 'text-red-500' : 'text-green-600'
        : 'text-gray-400'

  const bgColor =
    phase === 'prep' ? 'bg-amber-50 border-amber-200' :
    phase === 'response' ? 'bg-green-50 border-green-200' :
    'bg-gray-50 border-gray-200'

  return (
    <div className={`rounded-2xl border p-5 ${bgColor} ${className}`}>
      {/* Phase badges */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
          phase === 'prep'
            ? 'bg-amber-100 text-amber-700 border-amber-200'
            : 'bg-gray-100 text-gray-400 border-gray-200'
        }`}>
          준비
        </span>
        <span className="text-gray-300 text-xs">→</span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
          phase === 'response'
            ? 'bg-green-100 text-green-700 border-green-200'
            : phase === 'done'
              ? 'bg-gray-100 text-gray-400 border-gray-200'
              : 'bg-gray-100 text-gray-400 border-gray-200'
        }`}>
          답변
        </span>
      </div>

      {/* Timer display */}
      <div className={`text-5xl font-mono font-bold text-center mb-1 transition-colors ${phaseColor}`}>
        {phase === 'done' ? '완료' : display}
      </div>
      <p className={`text-center text-sm font-medium mb-4 ${phaseColor}`}>
        {phaseLabel}
      </p>

      {/* Controls */}
      <div className="flex gap-2 justify-center flex-wrap">
        {phase !== 'done' && (
          <>
            {!running ? (
              <button
                onClick={start}
                className="bg-gray-800 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-900 transition-colors"
              >
                시작
              </button>
            ) : (
              <button
                onClick={pause}
                className="bg-gray-500 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-600 transition-colors"
              >
                일시정지
              </button>
            )}
            {phase === 'prep' && (
              <button
                onClick={skip}
                className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-200 transition-colors"
              >
                건너뛰기
              </button>
            )}
          </>
        )}
        <button
          onClick={() => reset()}
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          리셋
        </button>
      </div>
    </div>
  )
}
