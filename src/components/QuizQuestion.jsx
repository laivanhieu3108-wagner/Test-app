import { useState } from 'react'
import { shuffle } from '../lib/utils'
import SpeakButton from './SpeakButton'

export default function QuizQuestion({ word, pool, onNext }) {
  // Ngẫu nhiên hỏi chiều Anh → Việt hoặc Việt → Anh
  const [{ reverse, options }] = useState(() => ({
    reverse: Math.random() < 0.5,
    options: shuffle([
      word,
      ...shuffle(pool.filter((w) => w.id !== word.id)).slice(0, 3),
    ]),
  }))
  const [picked, setPicked] = useState(null)

  const answered = picked !== null
  const correct = picked === word.id
  const label = (w) => (reverse ? w.word : w.meaning)

  return (
    <div className="card question">
      <p className="muted">
        {reverse ? 'Từ tiếng Anh nào có nghĩa là:' : 'Từ này nghĩa là gì?'}
      </p>
      <div className="prompt">
        {reverse ? (
          <span className="big-meaning">{word.meaning}</span>
        ) : (
          <>
            <span className="big-word">{word.word}</span>
            <SpeakButton text={word.word} />
          </>
        )}
      </div>

      <div className="options">
        {options.map((opt) => {
          let cls = 'option'
          if (answered && opt.id === word.id) cls += ' right'
          else if (answered && opt.id === picked) cls += ' wrong'
          return (
            <button
              key={opt.id}
              className={cls}
              disabled={answered}
              onClick={() => setPicked(opt.id)}
            >
              {label(opt)}
            </button>
          )
        })}
      </div>

      {answered && (
        <Feedback correct={correct} word={word} onNext={() => onNext(correct)} />
      )}
    </div>
  )
}

export function Feedback({ correct, word, onNext }) {
  return (
    <div className={`feedback ${correct ? 'ok' : 'bad'}`}>
      <div>
        {correct ? '✅ Chính xác!' : '❌ Chưa đúng.'}{' '}
        <strong>{word.word}</strong> {word.ipa} — {word.meaning}
      </div>
      <button className="primary" onClick={onNext} autoFocus>
        Tiếp tục →
      </button>
    </div>
  )
}
