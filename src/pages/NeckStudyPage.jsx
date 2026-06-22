import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Home,
  Trophy,
  X,
} from 'lucide-react'
import { useState } from 'react'
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
    score: 'Correct',
    chooseOne: 'Choose one answer.',
    chooseMany: 'Choose all correct answers.',
    check: 'Check answer',
    required: 'Choose an answer before checking.',
    correct: 'Correct — nicely done.',
    wrong: 'Not quite.',
    answer: 'Correct answer',
    answers: 'Correct answers',
    previous: 'Previous',
    next: 'Next question',
    finish: 'Finish quiz',
    complete: 'Quiz complete',
    completeText: 'You have reached the end of all 100 PDF questions.',
    home: 'Back to study sets',
    replay: 'Review from the beginning',
    sourceNote: 'English translations are based on the original German questions and answers from the source PDF.',
  },
  de: {
    back: 'Lernsets',
    title: 'IHK App by Nick Questions',
    question: 'Frage',
    of: 'von',
    score: 'Richtig',
    chooseOne: 'Wähle eine Antwort.',
    chooseMany: 'Wähle alle richtigen Antworten.',
    check: 'Antwort prüfen',
    required: 'Wähle eine Antwort, bevor du sie prüfst.',
    correct: 'Richtig — gut gemacht.',
    wrong: 'Noch nicht ganz.',
    answer: 'Richtige Antwort',
    answers: 'Richtige Antworten',
    previous: 'Zurück',
    next: 'Nächste Frage',
    finish: 'Quiz abschließen',
    complete: 'Quiz abgeschlossen',
    completeText: 'Du hast das Ende aller 100 PDF-Fragen erreicht.',
    home: 'Zurück zu den Lernsets',
    replay: 'Von vorne wiederholen',
    sourceNote: 'Fragetexte und Antworten wurden direkt aus dem deutschen Quell-PDF übernommen.',
  },
}

function sameAnswers(selected, correct) {
  if (selected.length !== correct.length) return false
  return [...selected].sort().every((value, index) => value === [...correct].sort()[index])
}

export default function NeckStudyPage() {
  const { language, t } = useLanguage()
  const { progress, recordNeckAnswer } = useProgress()
  const labels = copy[language]
  const firstUnanswered = neckQuestions.findIndex(
    (item) => progress.neckAnswers[item.id] === undefined,
  )
  const [currentIndex, setCurrentIndex] = useState(
    firstUnanswered === -1 ? 0 : firstUnanswered,
  )
  const [selected, setSelected] = useState([])
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [message, setMessage] = useState('')
  const [completed, setCompleted] = useState(false)
  const question = neckQuestions[currentIndex]
  const answeredCount = Object.keys(progress.neckAnswers).length
  const correctCount = Object.values(progress.neckAnswers).filter(Boolean).length
  const progressPercent = ((currentIndex + 1) / neckQuestions.length) * 100

  const showQuestion = (index) => {
    setCurrentIndex(Math.max(0, Math.min(neckQuestions.length - 1, index)))
    setSelected([])
    setChecked(false)
    setIsCorrect(false)
    setMessage('')
    setCompleted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectAnswer = (index) => {
    if (checked) return
    setMessage('')
    setSelected((current) => {
      if (!question.multiple) return [index]
      return current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    })
  }

  const checkAnswer = () => {
    if (selected.length === 0) {
      setMessage(labels.required)
      return
    }
    const correct = sameAnswers(selected, question.correct)
    setIsCorrect(correct)
    setChecked(true)
    recordNeckAnswer(question, correct)
  }

  const goNext = () => {
    if (currentIndex === neckQuestions.length - 1) {
      setCompleted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    showQuestion(currentIndex + 1)
  }

  if (completed) {
    return (
      <div className={styles.completed}>
        <div className={styles.trophy}>
          <Trophy size={38} />
        </div>
        <h1>{labels.complete}</h1>
        <p>{labels.completeText}</p>
        <strong className={styles.finalScore}>{correctCount} / 100</strong>
        <div className={styles.completedActions}>
          <Link to="/">
            <Home size={18} />
            {labels.home}
          </Link>
          <button type="button" onClick={() => showQuestion(0)}>
            {labels.replay}
          </button>
        </div>
      </div>
    )
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
        <div className={styles.score}>
          <Trophy size={20} />
          <span>{labels.score}</span>
          <strong>{correctCount} / {answeredCount}</strong>
        </div>
      </div>

      <div className={styles.progressTrack}>
        <span style={{ width: `${progressPercent}%` }} />
      </div>

      <div className={styles.contentGrid}>
        <nav className={styles.groups} aria-label="Question groups">
          {neckGroups.map((group) => {
            const groupQuestions = getNeckGroupQuestions(group.id)
            const groupComplete = groupQuestions.filter(
              (item) => progress.neckAnswers[item.id] !== undefined,
            ).length
            const active = question.group === group.id
            return (
              <button
                key={group.id}
                type="button"
                className={`${styles.groupButton} ${active ? styles.activeGroup : ''}`}
                onClick={() => showQuestion((group.id - 1) * 20)}
              >
                <span className={`${styles.groupNumber} ${styles[group.color]}`}>{group.id}</span>
                <span>
                  <strong>{t(group.title)}</strong>
                  <small>{groupComplete} / 20</small>
                </span>
              </button>
            )
          })}
        </nav>

        <article className={styles.quizCard}>
          <p className={styles.topic}>{t(question.topic)}</p>
          <h2>{t(question.prompt)}</h2>
          <p className={styles.instruction}>
            {question.multiple ? labels.chooseMany : labels.chooseOne}
          </p>

          <div className={styles.answers}>
            {question.options.map((answer, index) => {
              const isSelected = selected.includes(index)
              const isAnswer = question.correct.includes(index)
              const stateClass = checked
                ? isAnswer
                  ? styles.correctAnswer
                  : isSelected
                    ? styles.wrongAnswer
                    : ''
                : isSelected
                  ? styles.selected
                  : ''

              return (
                <button
                  key={`${question.id}-${index}`}
                  type="button"
                  className={`${styles.answerButton} ${stateClass}`}
                  aria-pressed={isSelected}
                  onClick={() => selectAnswer(index)}
                >
                  <span className={styles.answerLetter}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{t(answer)}</span>
                  {checked && isAnswer ? <Check className={styles.stateIcon} size={20} /> : null}
                  {checked && isSelected && !isAnswer ? <X className={styles.stateIcon} size={20} /> : null}
                </button>
              )
            })}
          </div>

          {message ? <p className={styles.validation}>{message}</p> : null}

          {checked ? (
            <div className={`${styles.feedback} ${isCorrect ? styles.good : styles.bad}`}>
              <strong>{isCorrect ? labels.correct : labels.wrong}</strong>
              {!isCorrect ? (
                <span>
                  {question.multiple ? labels.answers : labels.answer}:{' '}
                  {question.correct
                    .map((index) => t(question.options[index]))
                    .join(', ')}
                </span>
              ) : null}
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
            {!checked ? (
              <button type="button" className={styles.primary} onClick={checkAnswer}>
                {labels.check}
              </button>
            ) : (
              <button type="button" className={styles.primary} onClick={goNext}>
                {currentIndex === neckQuestions.length - 1 ? labels.finish : labels.next}
                <ChevronRight size={19} />
              </button>
            )}
          </div>
        </article>
      </div>

      <p className={styles.sourceNote}>{labels.sourceNote}</p>
    </div>
  )
}
