import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  ListChecks,
  RotateCcw,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { useProgress } from '../hooks/useProgress'
import { neckQuestions } from '../neckQuestions'
import { questions } from '../questions'
import styles from './LibraryPage.module.css'

const copy = {
  en: {
    title: 'Choose your study set',
    intro: 'Train with either of the two 100-question multiple-choice sets.',
    basics: 'Web Basics Quiz',
    basicsText: 'The original bilingual multiple-choice quiz from your Web Grundlagen PDF.',
    neck: 'IHK App by Nick Questions',
    neckText: '100 multiple-choice questions taken directly from the IHK Trainer PDF.',
    quizMeta: '100 questions · 5 levels',
    studyMeta: '100 questions · 5 groups',
    open: 'Open',
    continue: 'Continue',
    combined: 'Combined progress',
    completed: 'items studied',
    total: 'Total study items',
    collections: 'Collections',
    reset: 'Reset all progress',
    qaSectionTitle: 'Question & answer library',
    qaSectionIntro: 'Open the list to view every question from both quizzes with the correct answer.',
    showQa: 'Show all Q&A',
    hideQa: 'Hide Q&A',
    quizType: 'Quiz question',
    studyType: 'Nick quiz question',
    answerLabel: 'Answer',
  },
  de: {
    title: 'Wähle dein Lernset',
    intro: 'Trainiere mit einem von zwei Multiple-Choice-Sets mit jeweils 100 Fragen.',
    basics: 'Web-Grundlagen-Quiz',
    basicsText: 'Das ursprüngliche zweisprachige Multiple-Choice-Quiz aus deinem Web-Grundlagen-PDF.',
    neck: 'IHK App by Nick Questions',
    neckText: '100 Multiple-Choice-Fragen direkt aus dem IHK-Trainer-PDF.',
    quizMeta: '100 Fragen · 5 Level',
    studyMeta: '100 Fragen · 5 Gruppen',
    open: 'Öffnen',
    continue: 'Fortsetzen',
    combined: 'Gesamtfortschritt',
    completed: 'Elemente gelernt',
    total: 'Lernelemente insgesamt',
    collections: 'Lernsets',
    reset: 'Gesamten Fortschritt zurücksetzen',
    qaSectionTitle: 'Fragen- und Antwortbibliothek',
    qaSectionIntro: 'Öffne die Liste, um jede Frage aus beiden Quizzen mit der richtigen Antwort anzuzeigen.',
    showQa: 'Alle Q&A anzeigen',
    hideQa: 'Q&A ausblenden',
    quizType: 'Quiz-Frage',
    studyType: 'Nick-Quizfrage',
    answerLabel: 'Antwort',
  },
}

export default function LibraryPage() {
  const { language } = useLanguage()
  const { progress, resetProgress } = useProgress()
  const labels = copy[language]
  const quizAnswered = Object.keys(progress.answers).length
  const neckAnswered = Object.keys(progress.neckAnswers).length
  const totalItems = questions.length + neckQuestions.length
  const completed = quizAnswered + neckAnswered
  const percent = Math.round((completed / totalItems) * 100)
  const [qaVisible, setQaVisible] = useState(false)

  const qaItems = useMemo(() => {
    const quizItems = questions.map((question) => ({
      id: question.id,
      type: 'quiz',
      topic: question.topic[language],
      question: question.prompt[language],
      answer: question.correct
        .map((index) => question.options[index][language])
        .join(', '),
    }))

    const studyItems = neckQuestions.map((question) => ({
      id: question.id,
      type: 'study',
      topic: question.topic[language],
      question: question.prompt[language],
      answer: question.correct
        .map((index) => question.options[index][language])
        .join(', '),
    }))

    return [...quizItems, ...studyItems]
  }, [language])

  return (
    <div className={styles.page}>
      <section className={styles.intro}>
        <h1>{labels.title}</h1>
        <p>{labels.intro}</p>
      </section>

      <section className={styles.collections} aria-label={labels.collections}>
        <article className={styles.collection}>
          <div className={`${styles.collectionIcon} ${styles.blue}`}>
            <ListChecks size={31} />
          </div>
          <div className={styles.collectionCopy}>
            <h2>{labels.basics}</h2>
            <p>{labels.basicsText}</p>
            <span>{labels.quizMeta}</span>
          </div>
          <div className={styles.collectionProgress}>
            <div>
              <span style={{ width: `${quizAnswered}%` }} />
            </div>
            <strong>{quizAnswered}%</strong>
          </div>
          <Link to="/web-basics" className={styles.action}>
            {quizAnswered ? labels.continue : labels.open}
            <ArrowRight size={18} />
          </Link>
        </article>

        <article className={`${styles.collection} ${styles.neckCollection}`}>
          <div className={`${styles.collectionIcon} ${styles.mint}`}>
            <BrainCircuit size={31} />
          </div>
          <div className={styles.collectionCopy}>
            <h2>{labels.neck}</h2>
            <p>{labels.neckText}</p>
            <span>{labels.studyMeta}</span>
          </div>
          <div className={styles.collectionProgress}>
            <div>
              <span style={{ width: `${Math.round((neckAnswered / neckQuestions.length) * 100)}%` }} />
            </div>
            <strong>{Math.round((neckAnswered / neckQuestions.length) * 100)}%</strong>
          </div>
          <Link to="/neck-questions" className={styles.action}>
            {neckAnswered ? labels.continue : labels.open}
            <ArrowRight size={18} />
          </Link>
        </article>
      </section>

      <section className={styles.qaSection}>
        <div className={styles.qaHeader}>
          <div>
            <h2>{labels.qaSectionTitle}</h2>
            <p>{labels.qaSectionIntro}</p>
          </div>
          <button
            type="button"
            className={styles.toggleButton}
            aria-expanded={qaVisible}
            onClick={() => setQaVisible((visible) => !visible)}
          >
            {qaVisible ? labels.hideQa : labels.showQa}
          </button>
        </div>

        {qaVisible ? (
          <ul className={styles.qaList}>
            {qaItems.map((item) => (
              <li key={`${item.type}-${item.id}`} className={styles.qaItem}>
                <div className={styles.qaMeta}>
                  <span className={styles.qaType}>
                    {item.type === 'quiz' ? labels.quizType : labels.studyType}
                  </span>
                  <small>{item.topic}</small>
                </div>
                <h3 className={styles.qaQuestion}>{item.question}</h3>
                <p className={styles.qaAnswer}>
                  <strong>{labels.answerLabel}:</strong> {item.answer}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className={styles.summary}>
        <div className={styles.progressCircle} style={{ '--progress': `${percent * 3.6}deg` }}>
          <span>{percent}%</span>
        </div>
        <div className={styles.summaryLead}>
          <strong>{labels.combined}</strong>
          <span>{completed} / {totalItems} {labels.completed}</span>
        </div>
        <div className={styles.stat}>
          <BookOpenCheck size={22} />
          <strong>{totalItems}</strong>
          <span>{labels.total}</span>
        </div>
        <div className={styles.stat}>
          <BrainCircuit size={22} />
          <strong>2</strong>
          <span>{labels.collections}</span>
        </div>
        {completed > 0 ? (
          <button type="button" className={styles.reset} onClick={resetProgress}>
            <RotateCcw size={16} />
            {labels.reset}
          </button>
        ) : null}
      </section>
    </div>
  )
}
