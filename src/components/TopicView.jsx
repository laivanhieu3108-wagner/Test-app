import { POS_LABEL } from '../data/topics'
import { MAX_LEVEL, levelOf } from '../lib/progress'
import { MODES } from '../data/modes'
import SpeakButton from './SpeakButton'

export default function TopicView({ topic, progress, onBack, onStart }) {
  return (
    <>
      <button className="back" onClick={onBack}>
        ← Chủ đề
      </button>
      <h1 className="page-title">
        {topic.icon} {topic.name}
      </h1>

      <div className="modes">
        {Object.entries(MODES).map(([key, m]) => (
          <button key={key} className="mode-card" onClick={() => onStart(key)}>
            <span className="mode-icon" aria-hidden>
              {m.icon}
            </span>
            <span className="mode-name">{m.name}</span>
            <span className="mode-desc">{m.desc}</span>
          </button>
        ))}
      </div>

      <h2 className="section-title">Danh sách từ</h2>
      <ul className="word-list">
        {topic.words.map((w) => (
          <li key={w.id} className="word-row">
            <div className="word-main">
              <div>
                <strong>{w.word}</strong> <span className="ipa">{w.ipa}</span>{' '}
                <span className="pos">({POS_LABEL[w.pos]})</span>
              </div>
              <div className="meaning">{w.meaning}</div>
              <div className="example">{w.example}</div>
            </div>
            <Level level={levelOf(progress, w)} />
            <SpeakButton text={w.word} />
          </li>
        ))}
      </ul>
    </>
  )
}

function Level({ level }) {
  const label =
    level >= MAX_LEVEL ? 'Đã thuộc' : `Mức nhớ ${level}/${MAX_LEVEL}`
  return (
    <span className="level" title={label} aria-label={label}>
      {Array.from({ length: MAX_LEVEL }, (_, i) => (
        <span key={i} className={`dot ${i < level ? 'on' : ''}`} />
      ))}
    </span>
  )
}
