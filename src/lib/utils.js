import { levelOf } from './progress'

export function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Xếp các từ có cấp độ nhớ thấp lên trước (ngẫu nhiên trong cùng cấp độ),
// để từ hay sai được ôn nhiều hơn.
export function prioritize(words, progress) {
  return shuffle(words).sort(
    (a, b) => levelOf(progress, a) - levelOf(progress, b),
  )
}

export function speak(text) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-US'
  u.rate = 0.9
  window.speechSynthesis.speak(u)
}

export const canSpeak = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window
