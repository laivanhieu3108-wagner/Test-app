import { useCallback, useEffect, useState } from 'react'

// Mỗi từ có một "cấp độ nhớ" từ 0 đến MAX_LEVEL.
// Trả lời đúng: lên 1 cấp. Trả lời sai: về 0. Đạt MAX_LEVEL là "đã thuộc".
export const MAX_LEVEL = 3
const STORAGE_KEY = 'english-app.progress'

function load() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return data && typeof data === 'object' ? data : {}
  } catch {
    return {}
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
      // Trình duyệt chặn localStorage: tiến độ chỉ giữ trong phiên này
    }
  }, [progress])

  const record = useCallback((wordId, correct) => {
    setProgress((prev) => {
      const level = prev[wordId] ?? 0
      return { ...prev, [wordId]: correct ? Math.min(level + 1, MAX_LEVEL) : 0 }
    })
  }, [])

  const reset = useCallback(() => setProgress({}), [])

  return { progress, record, reset }
}

export const levelOf = (progress, word) => progress[word.id] ?? 0
export const isMastered = (progress, word) =>
  levelOf(progress, word) >= MAX_LEVEL
