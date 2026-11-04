import { TOPICS } from '../data/topics'
import { isMastered } from '../lib/progress'

export default function Home({ progress, onOpen, onReset }) {
  const total = TOPICS.reduce((n, t) => n + t.words.length, 0)
  const mastered = TOPICS.reduce(
    (n, t) => n + t.words.filter((w) => isMastered(progress, w)).length,
    0,
  )

  return (
    <>
      <header className="hero">
        <h1>Học tiếng Anh</h1>
        <p>
          Đã thuộc <strong>{mastered}</strong> / {total} từ
        </p>
        <ProgressBar value={mastered} max={total} />
      </header>

      <h2 className="section-title">Chọn chủ đề</h2>
      <ul className="topics">
        {TOPICS.map((topic) => {
          const done = topic.words.filter((w) => isMastered(progress, w)).length
          return (
            <li key={topic.id}>
              <button className="topic-card" onClick={() => onOpen(topic.id)}>
                <span className="topic-icon" aria-hidden>
                  {topic.icon}
                </span>
                <span className="topic-name">{topic.name}</span>
                <span className="topic-count">
                  {done}/{topic.words.length} từ
                </span>
                <ProgressBar value={done} max={topic.words.length} />
              </button>
            </li>
          )
        })}
      </ul>

      {mastered > 0 || Object.keys(progress).length > 0 ? (
        <button
          className="link-button"
          onClick={() => {
            if (confirm('Xoá toàn bộ tiến độ học?')) onReset()
          }}
        >
          Học lại từ đầu
        </button>
      ) : null}
    </>
  )
}

export function ProgressBar({ value, max }) {
  const pct = max ? Math.round((value / max) * 100) : 0
  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}
