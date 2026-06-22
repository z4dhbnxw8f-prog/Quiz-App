import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Trophy,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { useProgress } from '../hooks/useProgress'
import {
  getNeckGroupQuestions,
  neckGroups,
  neckQuestions,
} from '../neckQuestions'
import styles from './NeckStudyPage.module.css'

const copy = {
  en: {
    back: 'Study sets',
    title: 'IHK App by Nick Questions',
    question: 'Question',
    of: 'of',
    studied: 'Studied',
    chooseOne: 'Choose one answer.',
    check: 'Check answer',
    correct: 'Correct — nicely done.',
    wrong: 'Not quite. The correct answer is shown below.',
    answer: 'Answer',
    previous: 'Previous',
    next: 'Next question',
    sourceNote: 'Questions 1–100 use the PDF content in both German and English.',
  },
  de: {
    back: 'Lernsets',
    title: 'IHK App by Nick Questions',
    question: 'Frage',
    of: 'von',
    studied: 'Gelernt',
    chooseOne: 'Wähle eine Antwort.',
    check: 'Antwort prüfen',
    correct: 'Richtig — gut gemacht.',
    wrong: 'Noch nicht ganz. Die richtige Antwort wird unten angezeigt.',
    answer: 'Antwort',
    previous: 'Zurück',
    next: 'Nächste Frage',
    sourceNote: 'Fragen 1–100 verwenden den PDF-Inhalt in Deutsch und Englisch.',
  },
}

export default function NeckStudyPage() {
  const { language, t } = useLanguage()
  const { progress, markStudyViewed } = useProgress()
  const labels = copy[language]
  const firstUnviewed = neckQuestions.findIndex(
    (item) => !progress.studyViewed.includes(item.id),
  )
  const [currentIndex, setCurrentIndex] = useState(
    firstUnviewed === -1 ? 0 : firstUnviewed,
  )
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [message, setMessage] = useState('')
  const question = neckQuestions[currentIndex]
  const viewed = useMemo(() => new Set(progress.studyViewed), [progress.studyViewed])
  const progressPercent = ((currentIndex + 1) / neckQuestions.length) * 100

  const showQuestion = (index) => {
    setCurrentIndex(Math.max(0, Math.min(neckQuestions.length - 1, index)))
    setSelected(null)
    setChecked(false)
    setIsCorrect(false)
    setMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectAnswer = (index) => {
    if (checked) return
    setMessage('')
    setSelected(index)
  }

  const checkAnswer = () => {
    if (selected === null) {
      setMessage(labels.chooseOne)
      return
    }
    const correct = question.correct === selected
    setIsCorrect(correct)
    setChecked(true)
    markStudyViewed(question.id)
  }

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <Link to="/" className={styles.back}>
          <ArrowLeft size={19} />
          {labels.back}
        </Link>
        <div className={styles.titleBlock}>
          <h1>{labels.title}</h1>
          <span>
            {labels.question} {currentIndex + 1} {labels.of} {neckQuestions.length}
          </span>
        </div>
        <div className={styles.studied}>
          <Check size={20} />
          <span>{labels.studied}</span>
          <strong>{progress.studyViewed.length} / {neckQuestions.length}</strong>
        </div>
      </div>

      <div className={styles.progressTrack}>
        <span style={{ width: `${progressPercent}%` }} />
      </div>

      <div className={styles.contentGrid}>
        <nav className={styles.groups} aria-label="Question groups">
          {neckGroups.map((group) => {
            const groupQuestions = getNeckGroupQuestions(group.id)
            const groupComplete = groupQuestions.filter((item) => viewed.has(item.id)).length
            const active = question.group === group.id
            return (
              <button
                key={group.id}
                type="button"
                className={`${styles.groupButton} ${active ? styles.activeGroup : ''}`}
                onClick={() => showQuestion(neckQuestions.findIndex((item) => item.group === group.id))}
              >
                <span className={`${styles.groupNumber} ${styles[group.color]}`}>{group.id}</span>
                <span>
                  <strong>{t(group.title)}</strong>
                  <small>{groupComplete} / {groupQuestions.length}</small>
                </span>
              </button>
            )
          })}
        </nav>

        <article className={styles.studyCard}>
          <p className={styles.topic}>{t(question.topic)}</p>
          <h2>{t(question.question)}</h2>
          <p className={styles.instruction}>{labels.chooseOne}</p>

          <div className={styles.options}>
            {question.options.map((option, index) => {
              const isSelected = selected === index
              const isCorrectOption = question.correct === index
              const showCorrect = checked && isCorrectOption
              const showWrong = checked && isSelected && !isCorrectOption
              const buttonClass = [
                styles.optionButton,
                isSelected ? styles.selectedOption : '',
                showCorrect ? styles.correctOption : '',
                showWrong ? styles.wrongOption : '',
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <button
                  key={`${question.id}-${index}`}
                  type="button"
                  className={buttonClass}
                  onClick={() => selectAnswer(index)}
                  aria-pressed={isSelected}
                >
                  <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
                  <span>{t(option)}</span>
                  {showCorrect ? <Check className={styles.optionIcon} size={18} /> : null}
                  {showWrong ? <X className={styles.optionIcon} size={18} /> : null}
                </button>
              )
            })}
          </div>

          {message ? <p className={styles.validation}>{message}</p> : null}

          {checked ? (
            <div className={`${styles.feedback} ${isCorrect ? styles.good : styles.bad}`}>
              <strong>{isCorrect ? labels.correct : labels.wrong}</strong>
              <span>
                {labels.answer}: {t(question.answer)}
              </span>
            </div>
          ) : null}

          <div className={styles.navigation}>
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => showQuestion(currentIndex - 1)}
            >
              <ChevronLeft size={19} />
              {labels.previous}
            </button>
            <button
              type="button"
              className={styles.next}
              disabled={currentIndex === neckQuestions.length - 1 && !checked}
              onClick={() => {
                if (!checked) {
                  checkAnswer()
                } else {
                  showQuestion(currentIndex + 1)
                }
              }}
            >
              {checked ? labels.next : labels.check}
              <ChevronRight size={19} />
            </button>
          </div>
        </article>
      </div>

      <p className={styles.sourceNote}>{labels.sourceNote}</p>
    </div>
  )
}
