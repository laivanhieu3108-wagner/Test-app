import { canSpeak, speak } from '../lib/utils'

export default function SpeakButton({ text, size = 'md' }) {
  if (!canSpeak()) return null
  return (
    <button
      type="button"
      className={`speak speak-${size}`}
      onClick={(e) => {
        e.stopPropagation()
        speak(text)
      }}
      aria-label={`Nghe phát âm: ${text}`}
      title="Nghe phát âm"
    >
      🔊
    </button>
  )
}
