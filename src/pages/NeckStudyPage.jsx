import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
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
    show: 'Show answer',
    hide: 'Hide answer',
    answer: 'Answer',
    previous: 'Previous',
    next: 'Next question',
    sourceNote: 'Questions 1–10 use the PDF’s direct answers. Questions 11–65 are concise study answers created from the topics listed in the PDF.',
  },
  de: {
    back: 'Lernsets',
    title: 'IHK App by Nick Questions',
    question: 'Frage',
    of: 'von',
    studied: 'Gelernt',
    show: 'Antwort zeigen',
    hide: 'Antwort verbergen',
    answer: 'Antwort',
    previous: 'Zurück',
    next: 'Nächste Frage',
    sourceNote: 'Fragen 1–10 verwenden die direkten Antworten aus dem PDF. Fragen 11–65 sind kompakte Lernantworten zu den Themen, die im PDF aufgelistet sind.',
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
  const [answerVisible, setAnswerVisible] = useState(false)
  const question = neckQuestions[currentIndex]
  const viewed = useMemo(() => new Set(progress.studyViewed), [progress.studyViewed])
  const progressPercent = ((currentIndex + 1) / neckQuestions.length) * 100

  const showQuestion = (index) => {
    setCurrentIndex(Math.max(0, Math.min(neckQuestions.length - 1, index)))
    setAnswerVisible(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleAnswer = () => {
    const nextVisible = !answerVisible
    setAnswerVisible(nextVisible)
    if (nextVisible) markStudyViewed(question.id)
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
          <strong>{progress.studyViewed.length} / 65</strong>
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
                onClick={() => showQuestion((group.id - 1) * 13)}
              >
                <span className={`${styles.groupNumber} ${styles[group.color]}`}>{group.id}</span>
                <span>
                  <strong>{t(group.title)}</strong>
                  <small>{groupComplete} / 13</small>
                </span>
              </button>
            )
          })}
        </nav>

        <article className={styles.studyCard}>
          <p className={styles.topic}>{t(question.topic)}</p>
          <h2>{t(question.question)}</h2>

          <button type="button" className={styles.reveal} onClick={toggleAnswer}>
            {answerVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            {answerVisible ? labels.hide : labels.show}
          </button>

          <div
            className={`${styles.answerPanel} ${answerVisible ? styles.answerVisible : ''}`}
            aria-hidden={!answerVisible}
          >
            <span>{labels.answer}</span>
            <p>{t(question.answer)}</p>
          </div>

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
              disabled={currentIndex === neckQuestions.length - 1}
              onClick={() => showQuestion(currentIndex + 1)}
            >
              {labels.next}
              <ChevronRight size={19} />
            </button>
          </div>
        </article>
      </div>

      <p className={styles.sourceNote}>{labels.sourceNote}</p>
    </div>
  )
}
