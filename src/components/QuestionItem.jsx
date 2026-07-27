import { useState } from 'react'
import EnglishText from './EnglishText'

export default function QuestionItem({ question, partConfig, index, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [editingField, setEditingField] = useState(null)
  const [drafts, setDrafts] = useState({})

  function startEdit(field) {
    let initialValue
    if (field === 'templates') initialValue = (question.templates ?? []).join('\n')
    else if (field === 'tags') initialValue = (question.tags ?? []).join(', ')
    else initialValue = question[field] ?? ''
    setDrafts((d) => ({ ...d, [field]: initialValue }))
    setEditingField(field)
    if (!expanded) setExpanded(true)
  }

  function saveEdit(field) {
    const draft = typeof drafts[field] === 'string' ? drafts[field] : ''
    const value = field === 'templates'
      ? draft.split('\n').map((s) => s.trim()).filter(Boolean)
      : field === 'tags'
        ? draft.split(',').map((s) => s.trim()).filter(Boolean)
        : draft
    onUpdate(question.id, { [field]: value })
    setEditingField(null)
  }

  function handleKeyDown(e, field) {
    if (e.key === 'Escape') setEditingField(null)
    if (e.key === 'Enter' && e.metaKey) saveEdit(field)
  }

  const timingLabel = partConfig.perQuestionTimes
    ? `준비 ${partConfig.perQuestionTimes[0].prep}s / 답변 ${partConfig.perQuestionTimes[0].response}~${partConfig.perQuestionTimes.at(-1).response}s`
    : `준비 ${partConfig.prepTime}s / 답변 ${partConfig.responseTime}s`

  return (
    <div className={`bg-white rounded-xl border transition-colors ${question.memorized ? 'border-gray-200 opacity-70' : 'border-gray-200'} shadow-sm mb-3`}>
      {/* Header */}
      <div className="flex items-start gap-3 p-4">
        <button
          onClick={() => onUpdate(question.id, { memorized: !question.memorized })}
          className={`mt-0.5 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            question.memorized ? 'bg-gray-700 border-gray-700' : 'border-gray-300 hover:border-gray-500'
          }`}
        >
          {question.memorized && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono text-gray-400">Q{index + 1}</span>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{timingLabel}</span>
          </div>

          {editingField === 'prompt' ? (
            <textarea
              autoFocus
              className="w-full text-sm text-gray-800 border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
              rows={3}
              value={drafts.prompt}
              onChange={(e) => setDrafts((d) => ({ ...d, prompt: e.target.value }))}
              onKeyDown={(e) => handleKeyDown(e, 'prompt')}
              onBlur={() => saveEdit('prompt')}
            />
          ) : (
            <p
              className={`text-sm leading-relaxed cursor-text whitespace-pre-wrap ${question.memorized ? 'line-through text-gray-400' : 'text-gray-800'}`}
              onClick={() => startEdit('prompt')}
            >
              {question.prompt || <span className="text-gray-300 italic">문제 설명을 입력하세요…</span>}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {confirmDelete ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onDelete(question.id)}
                className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors"
              >
                삭제
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                취소
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-1.5 text-gray-300 hover:text-red-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-4">
          {/* Content (Part 1: 지문, Part 2: 사진 힌트, Part 4: 참조 정보) */}
          {(partConfig.id === 'p1' || partConfig.id === 'p2' || partConfig.id === 'p4') && (
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                {partConfig.id === 'p1' ? '지문' : partConfig.id === 'p2' ? '사진 힌트' : '참조 정보'}
              </p>
              {editingField === 'content' ? (
                <textarea
                  autoFocus
                  className="w-full text-sm border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 font-mono"
                  rows={5}
                  value={drafts.content}
                  onChange={(e) => setDrafts((d) => ({ ...d, content: e.target.value }))}
                  onKeyDown={(e) => handleKeyDown(e, 'content')}
                  onBlur={() => saveEdit('content')}
                />
              ) : (
                <div
                  onClick={() => startEdit('content')}
                  className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 cursor-text whitespace-pre-wrap leading-relaxed min-h-[60px]"
                >
                  {question.content || <span className="text-gray-300 italic">내용을 입력하세요…</span>}
                </div>
              )}
            </div>
          )}

          {/* Sample answer */}
          <div>
            <p className="text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">모범 답안</p>
            {editingField === 'sampleAnswer' ? (
              <textarea
                autoFocus
                className="w-full text-sm border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                rows={5}
                value={drafts.sampleAnswer}
                onChange={(e) => setDrafts((d) => ({ ...d, sampleAnswer: e.target.value }))}
                onKeyDown={(e) => handleKeyDown(e, 'sampleAnswer')}
                onBlur={() => saveEdit('sampleAnswer')}
              />
            ) : (
              <div
                onClick={() => startEdit('sampleAnswer')}
                className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 cursor-text whitespace-pre-wrap leading-relaxed min-h-[60px]"
              >
                {question.sampleAnswer
                  ? <EnglishText text={question.sampleAnswer} />
                  : <span className="text-gray-300 italic">모범 답안을 입력하세요…</span>}
              </div>
            )}
          </div>

          {/* Templates */}
          <div>
            <p className="text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">템플릿 문장</p>
            {editingField === 'templates' ? (
              <div>
                <textarea
                  autoFocus
                  className="w-full text-sm border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                  rows={4}
                  placeholder="한 줄에 하나씩 입력"
                  value={drafts.templates}
                  onChange={(e) => setDrafts((d) => ({ ...d, templates: e.target.value }))}
                  onKeyDown={(e) => handleKeyDown(e, 'templates')}
                  onBlur={() => saveEdit('templates')}
                />
                <p className="text-xs text-gray-400 mt-1">한 줄에 하나씩 입력 · Cmd+Enter 저장</p>
              </div>
            ) : (
              <div
                onClick={() => startEdit('templates')}
                className="min-h-[40px] cursor-text"
              >
                {question.templates.length > 0 ? (
                  <ul className="space-y-1">
                    {question.templates.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-300 shrink-0 mt-0.5">›</span>
                        <EnglishText text={t} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-sm text-gray-300 italic">템플릿 문장을 추가하세요…</span>
                )}
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <p className="text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">태그</p>
            {editingField === 'tags' ? (
              <input
                autoFocus
                type="text"
                className="w-full text-sm border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="쉼표로 구분: 비즈니스, 여행"
                value={drafts.tags}
                onChange={(e) => setDrafts((d) => ({ ...d, tags: e.target.value }))}
                onKeyDown={(e) => { if (e.key === 'Enter') saveEdit('tags'); if (e.key === 'Escape') setEditingField(null) }}
                onBlur={() => saveEdit('tags')}
              />
            ) : (
              <div onClick={() => startEdit('tags')} className="flex flex-wrap gap-1.5 cursor-text min-h-[28px]">
                {question.tags.length > 0
                  ? question.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
                    ))
                  : <span className="text-sm text-gray-300 italic">태그 추가…</span>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
