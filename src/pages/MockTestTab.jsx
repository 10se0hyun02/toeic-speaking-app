import { useReducer, useEffect, useRef, useState } from 'react'
import { TOEIC_PARTS, getTimingForSubQuestion } from '../constants/toeicParts'

const PART_INTRO_DELAY = 2500

function buildSession(data) {
  return TOEIC_PARTS.map((part) => ({
    part,
    questions: data.questionsForPart(part.id),
  }))
}

function advanceState(state) {
  const { session, partIdx, questionIdx, subQIdx } = state
  const currentPart = session[partIdx].part
  const currentQuestions = session[partIdx].questions
  const isPerQuestion = !!currentPart.perQuestionTimes
  const maxSubQ = isPerQuestion ? currentPart.perQuestionTimes.length - 1 : 0

  if (isPerQuestion && subQIdx < maxSubQ) {
    return { ...state, status: 'prep', subQIdx: subQIdx + 1 }
  }
  if (questionIdx < currentQuestions.length - 1) {
    return { ...state, status: 'prep', questionIdx: questionIdx + 1, subQIdx: 0 }
  }
  // Find next part with questions
  let nextPartIdx = partIdx + 1
  while (nextPartIdx < session.length && session[nextPartIdx].questions.length === 0) {
    nextPartIdx++
  }
  if (nextPartIdx < session.length) {
    return { ...state, status: 'part_intro', partIdx: nextPartIdx, questionIdx: 0, subQIdx: 0 }
  }
  return { ...state, status: 'result' }
}

function reducer(state, action) {
  switch (action.type) {
    case 'START': {
      const session = action.session
      // Find first part with questions
      const firstIdx = session.findIndex((s) => s.questions.length > 0)
      if (firstIdx === -1) return state
      return { status: 'part_intro', session, partIdx: firstIdx, questionIdx: 0, subQIdx: 0 }
    }
    case 'PART_READY':
      return { ...state, status: 'prep' }
    case 'PREP_DONE':
      return { ...state, status: 'response' }
    case 'SKIP_PREP':
      return { ...state, status: 'response' }
    case 'RESP_DONE':
      return advanceState(state)
    case 'ABORT':
      return { status: 'idle', session: null, partIdx: 0, questionIdx: 0, subQIdx: 0 }
    case 'RESTART':
      return { status: 'idle', session: null, partIdx: 0, questionIdx: 0, subQIdx: 0 }
    default:
      return state
  }
}

const INITIAL_STATE = {
  status: 'idle',
  session: null,
  partIdx: 0,
  questionIdx: 0,
  subQIdx: 0,
}

export default function MockTestTab({ data }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const { status, session, partIdx, questionIdx, subQIdx } = state
  const [countdown, setCountdown] = useState(0)
  const timerRef = useRef(null)

  // Timer effect: runs on prep/response transitions
  useEffect(() => {
    clearInterval(timerRef.current)
    if (status !== 'prep' && status !== 'response') return
    if (!session) return

    const part = session[partIdx]?.part
    if (!part) return
    const timing = getTimingForSubQuestion(part, subQIdx)
    const totalSeconds = status === 'prep' ? timing.prep : timing.response
    setCountdown(totalSeconds)

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setTimeout(() => {
            dispatch({ type: status === 'prep' ? 'PREP_DONE' : 'RESP_DONE' })
          }, 200)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [status, partIdx, questionIdx, subQIdx, session])

  // Auto-advance part_intro after delay
  useEffect(() => {
    if (status !== 'part_intro') return
    const t = setTimeout(() => dispatch({ type: 'PART_READY' }), PART_INTRO_DELAY)
    return () => clearTimeout(t)
  }, [status, partIdx])

  // ── Idle screen ──
  if (status === 'idle') {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">모의시험</h2>
          <p className="text-sm text-gray-500 mb-6">
            실제 토익스피킹과 동일한 순서·타이밍으로 Part 1~6을 자동 진행합니다.
          </p>
          <div className="space-y-2 mb-8 text-left">
            {TOEIC_PARTS.map((part) => {
              const qs = data.questionsForPart(part.id)
              const timingText = part.perQuestionTimes
                ? `준비 ${part.perQuestionTimes[0].prep}s / 답변 ${part.perQuestionTimes[0].response}~${part.perQuestionTimes.at(-1).response}s`
                : `준비 ${part.prepTime}s / 답변 ${part.responseTime}s`
              return (
                <div key={part.id} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                  <div>
                    <span className="text-xs font-bold text-gray-400 mr-2">Part {part.number}</span>
                    <span className="text-sm text-gray-700">{part.title}</span>
                    <span className="text-xs text-gray-400 ml-2">· {timingText}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${qs.length > 0 ? 'bg-gray-100 text-gray-600' : 'bg-red-50 text-red-400'}`}>
                    {qs.length > 0 ? `${qs.length}문제` : '없음'}
                  </span>
                </div>
              )
            })}
          </div>
          <button
            onClick={() => dispatch({ type: 'START', session: buildSession(data) })}
            className="w-full bg-gray-800 text-white py-3.5 rounded-xl font-medium text-base hover:bg-gray-900 transition-colors"
          >
            시험 시작
          </button>
          <p className="text-xs text-gray-400 mt-3">문제가 없는 파트는 자동으로 건너뜁니다.</p>
        </div>
      </div>
    )
  }

  // ── Result screen ──
  if (status === 'result') {
    const answered = session?.reduce((sum, { questions }) => sum + questions.length, 0) ?? 0
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-4 py-12">
        <div className="text-5xl mb-2">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800">모의시험 완료!</h2>
        <p className="text-gray-500">총 {answered}문제를 완료했습니다.</p>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => dispatch({ type: 'START', session: buildSession(data) })}
            className="bg-gray-800 text-white px-6 py-2.5 rounded-xl hover:bg-gray-900 transition-colors"
          >
            다시 시작
          </button>
          <button
            onClick={() => dispatch({ type: 'RESTART' })}
            className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
          >
            메인으로
          </button>
        </div>
      </div>
    )
  }

  const currentPartEntry = session?.[partIdx]
  const currentPart = currentPartEntry?.part
  const currentQuestions = currentPartEntry?.questions ?? []
  const currentQ = currentQuestions[questionIdx]

  // ── Part intro screen ──
  if (status === 'part_intro') {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
          <PartProgressDots session={session} partIdx={partIdx} />
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2 mt-6">
            Part {currentPart.number}
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">{currentPart.title}</h2>
          <p className="text-gray-500 text-sm mb-2">{currentPart.titleEn}</p>
          <p className="text-sm text-gray-500 mb-8">{currentPart.description}</p>
          <p className="text-xs text-gray-400">잠시 후 자동으로 시작됩니다…</p>
          <button
            onClick={() => dispatch({ type: 'PART_READY' })}
            className="mt-3 text-xs text-gray-500 underline underline-offset-2 hover:text-gray-700"
          >
            바로 시작
          </button>
        </div>
        <AbortButton dispatch={dispatch} />
      </div>
    )
  }

  // ── Prep / Response screen ──
  const isPrep = status === 'prep'
  const timing = getTimingForSubQuestion(currentPart, subQIdx)
  const urgent = countdown <= 10 && countdown > 0
  const mm = String(Math.floor(countdown / 60)).padStart(2, '0')
  const ss = String(countdown % 60).padStart(2, '0')

  return (
    <div className="max-w-lg mx-auto">
      <PartProgressDots session={session} partIdx={partIdx} />

      {/* Phase badge */}
      <div className="text-center my-4">
        <span className={`inline-block text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full ${
          isPrep ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
        }`}>
          {isPrep ? '준비 시간' : '답변 시간'}
        </span>
        {currentPart.perQuestionTimes && (
          <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
            Q{currentPart.questionNumbers[subQIdx]}
          </span>
        )}
      </div>

      {/* Countdown */}
      <div className={`text-center mb-5 text-7xl font-mono font-bold transition-colors ${urgent ? 'text-red-500' : 'text-gray-800'}`}>
        {mm}:{ss}
      </div>

      {/* Part 4 reference info */}
      {currentPart.id === 'p4' && currentQ?.content && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
          <p className="text-xs font-semibold text-blue-500 mb-2 uppercase tracking-wide">참조 정보</p>
          <pre className="text-sm text-blue-900 whitespace-pre-wrap font-sans leading-relaxed">{currentQ.content}</pre>
        </div>
      )}

      {/* Question card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-5">
        {currentPart.id === 'p1' && currentQ?.content && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
            <p className="text-xs font-semibold text-gray-400 mb-2">지문</p>
            <p className="text-sm text-gray-800 leading-relaxed">{currentQ.content}</p>
          </div>
        )}
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {currentQ?.prompt || '(문제 없음)'}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {isPrep ? (
          <button
            onClick={() => dispatch({ type: 'SKIP_PREP' })}
            className="flex-1 bg-amber-100 text-amber-700 py-3 rounded-xl text-sm font-medium hover:bg-amber-200 transition-colors"
          >
            준비 건너뛰기 →
          </button>
        ) : (
          <button
            onClick={() => dispatch({ type: 'RESP_DONE' })}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            다음으로 →
          </button>
        )}
        <AbortButton dispatch={dispatch} inline />
      </div>
    </div>
  )
}

function PartProgressDots({ session, partIdx }) {
  if (!session) return null
  return (
    <div className="flex items-center justify-center gap-1.5">
      {session.map((s, i) => (
        <div
          key={s.part.id}
          className={`rounded-full transition-all ${
            s.questions.length === 0
              ? 'w-2 h-2 bg-gray-100'
              : i < partIdx
                ? 'w-2 h-2 bg-gray-400'
                : i === partIdx
                  ? 'w-3 h-3 bg-gray-800'
                  : 'w-2 h-2 bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

function AbortButton({ dispatch, inline = false }) {
  const [confirming, setConfirming] = useState(false)

  if (confirming) {
    return (
      <div className={`flex items-center gap-2 ${inline ? '' : 'mt-4 justify-center'}`}>
        <span className="text-xs text-gray-500">시험을 중단할까요?</span>
        <button
          onClick={() => dispatch({ type: 'ABORT' })}
          className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors"
        >
          중단
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
        >
          계속
        </button>
      </div>
    )
  }

  if (inline) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="px-4 py-3 text-sm text-gray-400 hover:text-red-400 rounded-xl hover:bg-red-50 transition-colors"
      >
        중단
      </button>
    )
  }
  return (
    <button
      onClick={() => setConfirming(true)}
      className="mt-4 w-full text-sm text-gray-400 hover:text-red-400 transition-colors py-2"
    >
      시험 중단
    </button>
  )
}
