import { useState } from 'react'
import { prioritize } from '../lib/utils'
import { ProgressBar } from './Home'
import { MODES } from '../data/modes'
import Flashcard from './Flashcard'
import QuizQuestion from './QuizQuestion'
import SpellingQuestion from './SpellingQuestion'

const SESSION_SIZE = 10
const QUESTION = {
  flashcards: Flashcard,
  quiz: QuizQuestion,
  spelling: SpellingQuestion,
}

export default function Practice({ mode, topic, progress, record, onExit }) {
  const newDeck = () => prioritize(topic.words, progress).slice(0, SESSION_SIZE)
  const [deck, setDeck] = useState(newDeck)
  const [index, setIndex] = useState(0)
  const [results, setResults] = useState([])

  const Question = QUESTION[mode]
  const finished = index >= deck.length

  const next = (correct) => {
    record(deck[index].id, correct)
    setResults((r) => [...r, { word: deck[index], correct }])
    setIndex((i) => i + 1)
  }

  const restart = () => {
    setDeck(newDeck())
    setIndex(0)
    setResults([])
  }

  return (
    <>
      <div className="practice-head">
        <button className="back" onClick={onExit}>
          ← {topic.name}
        </button>
        <span className="practice-mode">
          {MODES[mode].icon} {MODES[mode].name}
        </span>
        <span className="practice-count">
          {Math.min(index + 1, deck.length)}/{deck.length}
        </span>
      </div>
      <ProgressBar value={index} max={deck.length} />

      {finished ? (
        <Summary
          mode={mode}
          results={results}
          onRetry={restart}
          onExit={onExit}
        />
      ) : (
        <Question
          key={index}
          word={deck[index]}
          pool={topic.words}
          onNext={next}
        />
      )}
    </>
  )
}

function Summary({ mode, results, onRetry, onExit }) {
  const correct = results.filter((r) => r.correct).length
  const wrong = results.filter((r) => !r.correct)
  const pct = Math.round((correct / results.length) * 100)
  const msg =
    pct === 100
      ? 'Xuất sắc! 🎉'
      : pct >= 70
        ? 'Làm tốt lắm! 👏'
        : 'Cố lên, ôn thêm chút nữa nhé! 💪'

  return (
    <div className="card summary">
      <h2>{msg}</h2>
      <p className="score">
        {mode === 'flashcards' ? 'Đã nhớ' : 'Đúng'} {correct}/{results.length}
      </p>
      {wrong.length > 0 && (
        <>
          <p className="muted">Các từ cần ôn thêm:</p>
          <ul className="review">
            {wrong.map(({ word }) => (
              <li key={word.id}>
                <strong>{word.word}</strong> — {word.meaning}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="actions">
        <button className="secondary" onClick={onExit}>
          Về chủ đề
        </button>
        <button className="primary" onClick={onRetry} autoFocus>
          Luyện tiếp
        </button>
      </div>
    </div>
  )
}
