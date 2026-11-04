import { useState } from 'react'
import { POS_LABEL } from '../data/topics'
import { Feedback } from './QuizQuestion'
import SpeakButton from './SpeakButton'

const normalize = (s) => s.trim().toLowerCase().replace(/\s+/g, ' ')

export default function SpellingQuestion({ word, onNext }) {
  const [input, setInput] = useState('')
  const [checked, setChecked] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const correct = normalize(input) === normalize(word.word)

  const submit = (e) => {
    e.preventDefault()
    if (!input.trim() || checked) return
    setChecked(true)
  }

  const hint =
    word.word[0] +
    word.word
      .slice(1)
      .replace(/[a-z]/gi, ' _')

  return (
    <div className="card question">
      <p className="muted">Gõ từ tiếng Anh có nghĩa là:</p>
      <div className="prompt">
        <span className="big-meaning">{word.meaning}</span>
        <span className="pos">({POS_LABEL[word.pos]})</span>
      </div>

      <div className="hint-row">
        <SpeakButton text={word.word} />
        {showHint ? (
          <code className="letters">{hint}</code>
        ) : (
          <button
            type="button"
            className="link-button"
            onClick={() => setShowHint(true)}
          >
            Gợi ý
          </button>
        )}
      </div>

      <form onSubmit={submit} className="spell-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập từ tiếng Anh…"
          aria-label="Câu trả lời"
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          readOnly={checked}
          className={checked ? (correct ? 'right' : 'wrong') : ''}
        />
        {!checked && (
          <button className="primary" type="submit" disabled={!input.trim()}>
            Kiểm tra
          </button>
        )}
      </form>

      {checked && (
        <Feedback correct={correct} word={word} onNext={() => onNext(correct)} />
      )}
    </div>
  )
}
