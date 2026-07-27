import { useState, useEffect } from 'react'
import { TOEIC_PARTS, PART_MAP, getTimingForSubQuestion } from '../constants/toeicParts'
import { useDualPhaseTimer } from '../hooks/useTimer'
import DualPhaseTimer from '../components/DualPhaseTimer'
import EnglishText from '../components/EnglishText'

export default function PracticeTab({ data }) {
  const [stage, setStage] = useState('config')
  const [selectedPartId, setSelectedPartId] = useState('p1')
  const [questionIdx, setQuestionIdx] = useState(0)
  const [subQIdx, setSubQIdx] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const partConfig = PART_MAP[selectedPartId]
  const questions = data.questionsForPart(selectedPartId)

  const currentQ = questions[questionIdx]
  const timing = partConfig ? getTimingForSubQuestion(partConfig, subQIdx) : { prep: 30, response: 60 }

  const timer = useDualPhaseTimer({
    prepSeconds: timing.prep,
    responseSeconds: timing.response,
    onPrepEnd: () => {},
    onResponseEnd: () => {},
  })

  useEffect(() => {
    if (stage === 'drilling') {
      timer.reset(timing.prep, timing.response)
      setShowAnswer(false)
    }
  }, [questionIdx, subQIdx, stage])

  function startDrill() {
    if (questions.length === 0) return
    setQuestionIdx(0)
    setSubQIdx(0)
    setShowAnswer(false)
    setStage('drilling')
  }

  function advance() {
    const isPerQuestion = !!partConfig.perQuestionTimes
    if (isPerQuestion && subQIdx < partConfig.perQuestionTimes.length - 1) {
      setSubQIdx((s) => s + 1)
    } else if (questionIdx < questions.length - 1) {
      setQuestionIdx((i) => i + 1)
      setSubQIdx(0)
    } else {
      setStage('result')
    }
  }

  function restart() {
    setStage('config')
    setQuestionIdx(0)
    setSubQIdx(0)
  }

  if (stage === 'result') {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">연습 완료!</h2>
        <p className="text-gray-500">
          Part {partConfig.number} · {questions.length}문제 완료
        </p>
        <div className="flex gap-3">
          <button
            onClick={startDrill}
            className="bg-gray-800 text-white px-6 py-2.5 rounded-xl hover:bg-gray-900 transition-colors"
          >
            다시 연습
          </button>
          <button
            onClick={restart}
            className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
          >
            파트 변경
          </button>
        </div>
      </div>
    )
  }

  if (stage === 'config') {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-1">파트 연습</h2>
          <p className="text-sm text-gray-500 mb-6">연습할 파트를 선택하고 시작하세요.</p>

          <div className="space-y-2 mb-6">
            {TOEIC_PARTS.map((part) => {
              const prog = data.progressForPart(part.id)
              const qs = data.questionsForPart(part.id)
              const timingText = part.perQuestionTimes
                ? `준비 ${part.perQuestionTimes[0].prep}s / 답변 ${part.perQuestionTimes[0].response}~${part.perQuestionTimes.at(-1).response}s`
                : `준비 ${part.prepTime}s / 답변 ${part.responseTime}s`
              return (
                <button
                  key={part.id}
                  onClick={() => setSelectedPartId(part.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${
                    selectedPartId === part.id
                      ? 'border-gray-800 bg-gray-800 text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-xs font-bold ${selectedPartId === part.id ? 'text-gray-300' : 'text-gray-400'}`}>Part {part.number}</span>
                      <span className="mx-2 text-gray-300 text-xs">·</span>
                      <span className="text-sm font-medium">{part.title}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs ${selectedPartId === part.id ? 'text-gray-300' : 'text-gray-400'}`}>{qs.length}문제</span>
                    </div>
                  </div>
                  <p className={`text-xs mt-1 ${selectedPartId === part.id ? 'text-gray-400' : 'text-gray-400'}`}>{timingText}</p>
                </button>
              )
            })}
          </div>

          <button
            onClick={startDrill}
            disabled={questions.length === 0}
            className="w-full bg-gray-800 text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {questions.length === 0 ? '문제가 없습니다 (학습 자료 탭에서 추가)' : `Part ${partConfig.number} 연습 시작`}
          </button>
        </div>
      </div>
    )
  }

  // Drilling stage
  const isPerQuestion = !!partConfig.perQuestionTimes
  const subQLabel = isPerQuestion
    ? `Q${partConfig.questionNumbers[subQIdx]}`
    : null
  const totalSteps = isPerQuestion
    ? questions.length * partConfig.perQuestionTimes.length
    : questions.length
  const currentStep = isPerQuestion
    ? questionIdx * partConfig.perQuestionTimes.length + subQIdx
    : questionIdx

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-4">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentStep ? 'bg-gray-400' : i === currentStep ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          />
        ))}
        <span className="text-xs text-gray-400 shrink-0">{currentStep + 1}/{totalSteps}</span>
      </div>

      {/* Part badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
          Part {partConfig.number} · {partConfig.title}
        </span>
        {subQLabel && (
          <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
            {subQLabel}
          </span>
        )}
      </div>

      {/* Part 4: reference info (always visible) */}
      {partConfig.id === 'p4' && currentQ?.content && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
          <p className="text-xs font-semibold text-blue-500 mb-2 uppercase tracking-wide">참조 정보</p>
          <pre className="text-sm text-blue-900 whitespace-pre-wrap font-sans leading-relaxed">{currentQ.content}</pre>
        </div>
      )}

      {/* Question card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-4">
        {/* Part 1: passage to read */}
        {partConfig.id === 'p1' && currentQ?.content && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">지문</p>
            <p className="text-sm text-gray-800 leading-relaxed">{currentQ.content}</p>
          </div>
        )}

        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {currentQ?.prompt || '(문제 없음)'}
        </p>

        {/* Reveal answer */}
        {showAnswer && currentQ?.sampleAnswer && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">모범 답안</p>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              <EnglishText text={currentQ.sampleAnswer} />
            </div>
          </div>
        )}

        {currentQ?.sampleAnswer && !showAnswer && (
          <button
            onClick={() => setShowAnswer(true)}
            className="mt-3 text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
          >
            모범 답안 보기
          </button>
        )}
      </div>

      {/* Timer */}
      <DualPhaseTimer timer={timer} className="mb-4" />

      {/* Next button */}
      <button
        onClick={advance}
        className="w-full bg-gray-800 text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
      >
        {currentStep + 1 >= totalSteps ? '완료' : '다음 →'}
      </button>
    </div>
  )
}
