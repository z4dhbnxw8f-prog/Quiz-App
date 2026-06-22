/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'webwise-progress-v2'
const initialProgress = {
  version: 4,
  answers: {},
  neckAnswers: {},
  studyViewed: [],
}

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...initialProgress, ...JSON.parse(saved) } : initialProgress
  } catch {
    return initialProgress
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // The quiz remains usable when storage is unavailable.
  }
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress)

  const recordAnswer = (question, isCorrect) => {
    setProgress((current) => {
      const next = {
        ...current,
        answers: {
          ...current.answers,
          [question.id]: isCorrect,
        },
      }
      saveProgress(next)
      return next
    })
  }

  const recordNeckAnswer = (question, isCorrect) => {
    setProgress((current) => {
      const next = {
        ...current,
        neckAnswers: {
          ...current.neckAnswers,
          [question.id]: isCorrect,
        },
      }
      saveProgress(next)
      return next
    })
  }

  const resetProgress = () => {
    saveProgress(initialProgress)
    setProgress(initialProgress)
  }

  const markStudyViewed = (questionId) => {
    setProgress((current) => {
      if (current.studyViewed.includes(questionId)) return current
      const next = {
        ...current,
        studyViewed: [...current.studyViewed, questionId],
      }
      saveProgress(next)
      return next
    })
  }

  const value = useMemo(
    () => ({
      progress,
      recordAnswer,
      recordNeckAnswer,
      resetProgress,
      markStudyViewed,
    }),
    [progress],
  )

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress must be used inside ProgressProvider')
  return context
}
