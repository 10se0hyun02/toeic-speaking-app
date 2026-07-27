import { useState } from 'react'
import { TOEIC_PARTS, PART_MAP } from '../constants/toeicParts'
import PartPanel from '../components/PartPanel'
import QuestionItem from '../components/QuestionItem'
import EnglishText from '../components/EnglishText'

export default function StudyTab({ data }) {
  const [selectedPartId, setSelectedPartId] = useState('p1')
  const [newPrompt, setNewPrompt] = useState('')
  const [adding, setAdding] = useState(false)
  const [viewMode, setViewMode] = useState('cards')

  const partConfig = PART_MAP[selectedPartId]
  const questions = data.questionsForPart(selectedPartId)
  const progress = data.progressForPart(selectedPartId)

  function handleAdd() {
    if (!newPrompt.trim()) return
    data.addQuestion(selectedPartId, newPrompt.trim())
    setNewPrompt('')
    setAdding(false)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <PartPanel
        parts={TOEIC_PARTS}
        selectedId={selectedPartId}
        onSelect={setSelectedPartId}
        progressForPart={data.progressForPart}
      />

      <div className="flex-1 min-w-0">
        {/* Part header */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Part {partConfig.number}</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-400">{partConfig.titleEn}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{partConfig.title}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{partConfig.description}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 mt-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${viewMode === 'cards' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
            >
              카드
            </button>
            <button
              onClick={() => setViewMode('doc')}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${viewMode === 'doc' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
            >
              답안 보기
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {progress.total > 0 && (
          <div className="flex items-center gap-3 mb-4 mt-3">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
              <div
                className="h-1.5 bg-gray-700 rounded-full transition-all"
                style={{ width: `${progress.pct}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">{progress.done}/{progress.total} 암기</span>
          </div>
        )}

        {viewMode === 'cards' ? (
          <>
            {questions.length === 0 && !adding && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-sm">아직 문제가 없습니다.</p>
                <p className="text-xs mt-1">아래 버튼으로 문제를 추가해보세요.</p>
              </div>
            )}

            {questions.map((q, i) => (
              <QuestionItem
                key={q.id}
                question={q}
                partConfig={partConfig}
                index={i}
                onUpdate={data.updateQuestion}
                onDelete={data.deleteQuestion}
              />
            ))}

            {adding ? (
              <div className="bg-white rounded-xl border border-gray-300 shadow-sm p-4 mb-3">
                <textarea
                  autoFocus
                  className="w-full text-sm text-gray-800 border border-gray-200 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 mb-3"
                  rows={3}
                  placeholder="문제 설명을 입력하세요…"
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.metaKey) handleAdd()
                    if (e.key === 'Escape') { setAdding(false); setNewPrompt('') }
                  }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAdd}
                    className="bg-gray-800 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    추가
                  </button>
                  <button
                    onClick={() => { setAdding(false); setNewPrompt('') }}
                    className="text-sm text-gray-500 px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setAdding(true)}
                className="w-full py-2.5 text-sm text-gray-400 border border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:text-gray-600 transition-colors"
              >
                + 문제 추가
              </button>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            {questions.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">이 파트에 문제가 없습니다.</p>
            ) : (
              <div className="space-y-6">
                {questions.map((q, i) => (
                  <div key={q.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Q{i + 1}</p>
                    <p className="text-sm text-gray-600 mb-3 whitespace-pre-wrap">{q.prompt}</p>
                    {q.sampleAnswer && (
                      <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                        <EnglishText text={q.sampleAnswer} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
