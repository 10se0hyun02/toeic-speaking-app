// Heuristic English POS highlighting — word lists + suffix rules, no parser.
// prepositions / adverbs / adjectives → underline, verbs (incl. aux) → bold.

const PREPOSITIONS = new Set([
  'in', 'on', 'at', 'to', 'from', 'with', 'about', 'of', 'for', 'by', 'into',
  'over', 'under', 'after', 'before', 'between', 'during', 'through',
  'around', 'near', 'without', 'since', 'until', 'up', 'down', 'off', 'out',
])

const ADVERBS = new Set([
  'very', 'really', 'quite', 'too', 'so', 'often', 'sometimes', 'usually',
  'always', 'never', 'just', 'still', 'already', 'almost', 'also', 'well',
  'pretty', 'even', 'now', 'then', 'here', 'there', 'today', 'maybe',
  'together', 'once', 'twice', 'again', 'soon', 'later', 'early', 'late',
])

const ADJECTIVES = new Set([
  'good', 'great', 'nice', 'big', 'small', 'happy', 'sad', 'busy', 'easy',
  'hard', 'difficult', 'fun', 'funny', 'interesting', 'boring', 'beautiful',
  'favorite', 'new', 'old', 'young', 'hot', 'cold', 'warm', 'cool',
  'delicious', 'comfortable', 'quiet', 'loud', 'crowded', 'famous',
  'important', 'tired', 'excited', 'relaxing', 'amazing', 'wonderful',
  'special', 'close', 'best', 'better', 'free', 'perfect', 'fresh', 'clean',
])

const VERB_BASES = [
  'be', 'am', 'is', 'are', 'was', 'were', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'done',
  'will', 'would', 'can', 'could', 'should', 'must', 'may', 'might',
  'go', 'goes', 'went', 'gone', 'get', 'got', 'gotten',
  'like', 'love', 'enjoy', 'live', 'work', 'play', 'watch', 'listen',
  'eat', 'ate', 'drink', 'drank', 'take', 'took', 'taken', 'make', 'made',
  'come', 'came', 'see', 'saw', 'seen', 'think', 'thought', 'know', 'knew',
  'want', 'need', 'feel', 'felt', 'try', 'tried', 'use', 'spend', 'spent',
  'visit', 'meet', 'met', 'talk', 'tell', 'told', 'say', 'said', 'ask',
  'help', 'start', 'finish', 'buy', 'bought', 'cook', 'clean', 'walk',
  'run', 'ran', 'exercise', 'relax', 'hang', 'hung', 'stay', 'keep', 'kept',
  'wake', 'woke', 'sleep', 'slept', 'read', 'write', 'wrote', 'learn',
]

const VERBS = new Set()
for (const v of VERB_BASES) {
  VERBS.add(v)
  VERBS.add(v + 's')
  VERBS.add(v + 'es')
  VERBS.add(v + 'ed')
  VERBS.add(v + 'd')
  VERBS.add(v + 'ing')
  if (/[^aeiou]e$/.test(v)) VERBS.add(v.slice(0, -1) + 'ing')
}

function renderWord(word, key) {
  const w = word.toLowerCase()
  if (PREPOSITIONS.has(w) || ADVERBS.has(w) || /..ly$/.test(w)) {
    return <u key={key} className="underline-offset-2">{word}</u>
  }
  if (ADJECTIVES.has(w) || /(ful|ous|ible|able)$/.test(w)) {
    return <u key={key} className="underline-offset-2">{word}</u>
  }
  if (VERBS.has(w)) {
    return <strong key={key} className="font-bold">{word}</strong>
  }
  return word
}

export default function EnglishText({ text }) {
  if (!text) return null
  return text.split(/(\s+)/).map((tok, i) => {
    if (!tok || /^\s+$/.test(tok)) return tok
    const m = tok.match(/^(["'(]*)([A-Za-z'-]+)([.,!?…;:)"']*)$/)
    if (!m) return tok
    return (
      <span key={i}>
        {m[1]}
        {renderWord(m[2], `w${i}`)}
        {m[3]}
      </span>
    )
  })
}
