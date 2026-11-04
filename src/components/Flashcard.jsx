import { useEffect, useState } from 'react'
import { POS_LABEL } from '../data/topics'
import SpeakButton from './SpeakButton'

export default function Flashcard({ word, onNext }) {
  const [flipped, setFlipped] = useState(false)

  // Phím tắt: Space để lật thẻ, ← chưa nhớ, → đã nhớ
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === ' ') {
        e.preventDefault()
        setFlipped((f) => !f)
      } else if (flipped && e.key === 'ArrowLeft') onNext(false)
      else if (flipped && e.key === 'ArrowRight') onNext(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipped, onNext])

  return (
    <>
      <div
        className={`flashcard ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label={flipped ? 'Mặt sau của thẻ' : 'Nhấn để lật thẻ'}
      >
        <div className="flashcard-inner">
          <div className="face face-front">
            <div className="big-word">{word.word}</div>
            <div className="ipa">{word.ipa}</div>
            <SpeakButton text={word.word} size="lg" />
            <div className="hint">Nhấn để lật thẻ</div>
          </div>
          <div className="face face-back">
            <div className="pos">{POS_LABEL[word.pos]}</div>
            <div className="big-meaning">{word.meaning}</div>
            <div className="example">
              “{word.example}” <SpeakButton text={word.example} size="sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="actions">
        {flipped ? (
          <>
            <button className="danger" onClick={() => onNext(false)}>
              Chưa nhớ
            </button>
            <button className="primary" onClick={() => onNext(true)}>
              Đã nhớ
            </button>
          </>
        ) : (
          <button className="primary" onClick={() => setFlipped(true)}>
            Lật thẻ
          </button>
        )}
      </div>
      <p className="kbd-hint">Phím tắt: Space lật thẻ · ← chưa nhớ · → đã nhớ</p>
    </>
  )
}
