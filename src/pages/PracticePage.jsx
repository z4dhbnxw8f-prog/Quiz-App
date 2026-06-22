import { ArrowLeft, ArrowRight, Check, Home, Trophy, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { useProgress } from '../hooks/useProgress'
import { getLevelQuestions, levels } from '../questions'
import styles from './PracticePage.module.css'

const copy = {
  en: {
    exit: 'Exit',
    level: 'Level',
    question: 'Question',
    of: 'of',
    score: 'Correct',
    chooseOne: 'Choose one answer.',
    chooseMany: 'Choose all correct answers.',
    check: 'Check answer',
    next: 'Next question',
    finish: 'Finish level',
    required: 'Choose an answer before checking.',
    correct: 'Correct — nicely done.',
    wrong: 'Not quite.',
    answer: 'Correct answer',
    answers: 'Correct answers',
    complete: 'Level complete',
    completeText: 'You have worked through all 20 questions in this level.',
    home: 'Back to levels',
    nextLevel: 'Next level',
    replay: 'Practice this level again',
  },
  de: {
    exit: 'Beenden',
    level: 'Level',
    question: 'Frage',
    of: 'von',
    score: 'Richtig',
    chooseOne: 'Wähle eine Antwort.',
    chooseMany: 'Wähle alle richtigen Antworten.',
    check: 'Antwort prüfen',
    next: 'Nächste Frage',
    finish: 'Level abschließen',
    required: 'Wähle eine Antwort, bevor du sie prüfst.',
    correct: 'Richtig — gut gemacht.',
    wrong: 'Noch nicht ganz.',
    answer: 'Richtige Antwort',
    answers: 'Richtige Antworten',
    complete: 'Level abgeschlossen',
    completeText: 'Du hast alle 20 Fragen dieses Levels bearbeitet.',
    home: 'Zurück zu den Levels',
    nextLevel: 'Nächstes Level',
    replay: 'Level erneut üben',
  },
}

function sameAnswers(selected, correct) {
  if (selected.length !== correct.length) return false
  return [...selected].sort().every((value, index) => value === [...correct].sort()[index])
}

export default function PracticePage() {
  const { level: levelParam } = useParams()
  const levelId = Number(levelParam)
  const level = levels.find((item) => item.id === levelId)
  const levelQuestions = useMemo(() => getLevelQuestions(levelId), [levelId])
  const { language, t } = useLanguage()
  const { progress, recordAnswer } = useProgress()
  const labels = copy[language]

  const firstUnanswered = levelQuestions.findIndex(
    (item) => progress.answers[item.id] === undefined,
  )
  const [currentIndex, setCurrentIndex] = useState(
    firstUnanswered === -1 ? 0 : firstUnanswered,
  )
  const [selected, setSelected] = useState([])
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [message, setMessage] = useState('')
  const [completed, setCompleted] = useState(false)

  if (!level || levelQuestions.length !== 20) return <Navigate to="/" replace />

  const question = levelQuestions[currentIndex]
  const correctCount = levelQuestions.filter(
    (item) => progress.answers[item.id] === true,
  ).length
  const progressPercent = ((currentIndex + 1) / levelQuestions.length) * 100

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
    recordAnswer(question, correct)
  }

  const goNext = () => {
    if (currentIndex === levelQuestions.length - 1) {
      setCompleted(true)
      return
    }
    setCurrentIndex((index) => index + 1)
    setSelected([])
    setChecked(false)
    setIsCorrect(false)
    setMessage('')
  }

  const replay = () => {
    setCurrentIndex(0)
    setSelected([])
    setChecked(false)
    setIsCorrect(false)
    setMessage('')
    setCompleted(false)
  }

  if (completed) {
    const finalCorrect = levelQuestions.filter(
      (item) => progress.answers[item.id] === true,
    ).length
    return (
      <div className={styles.completed}>
        <div className={styles.trophy}>
          <Trophy size={38} />
        </div>
        <p className={styles.completeLevel}>
          {labels.level} {levelId}
        </p>
        <h1>{labels.complete}</h1>
        <p>{labels.completeText}</p>
        <strong className={styles.finalScore}>{finalCorrect} / 20</strong>
        <div className={styles.completedActions}>
          <Link to="/web-basics">
            <Home size={18} />
            {labels.home}
          </Link>
          {levelId < 5 ? (
            <Link to={`/quiz/${levelId + 1}`} className={styles.primaryLink}>
              {labels.nextLevel}
              <ArrowRight size={18} />
            </Link>
          ) : (
            <button type="button" onClick={replay}>
              {labels.replay}
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.quizHeader}>
        <Link to="/web-basics" className={styles.exit}>
          <ArrowLeft size={21} />
          <span>{labels.exit}</span>
        </Link>
        <div className={styles.levelMeta}>
          <strong>
            {labels.level} {levelId} — {t(level.title)}
          </strong>
          <span>
            {labels.question} {currentIndex + 1} {labels.of} 20
          </span>
        </div>
        <div className={styles.score}>
          <Trophy size={21} />
          <span>{labels.score}</span>
          <strong>{correctCount} / 20</strong>
        </div>
      </div>

      <div className={styles.progressTrack} aria-label={`${Math.round(progressPercent)}%`}>
        <span style={{ width: `${progressPercent}%` }} />
      </div>

      <article className={styles.questionCard}>
        <p className={styles.topic}>{t(question.topic)}</p>
        <h1>{t(question.prompt)}</h1>
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

        <div className={styles.actions}>
          {!checked ? (
            <button type="button" className={styles.primary} onClick={checkAnswer}>
              {labels.check}
            </button>
          ) : (
            <button type="button" className={styles.primary} onClick={goNext}>
              {currentIndex === 19 ? labels.finish : labels.next}
              <ArrowRight size={19} />
            </button>
          )}
        </div>
      </article>
    </div>
  )
}
