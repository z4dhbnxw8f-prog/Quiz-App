import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  ListChecks,
  RotateCcw,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { useProgress } from '../hooks/useProgress'
import { neckQuestions } from '../neckQuestions'
import { questions } from '../questions'
import styles from './LibraryPage.module.css'

const copy = {
  en: {
    title: 'Choose your study set',
    intro: 'Train with the original Web Basics quiz or revise the new IHK question-and-answer collection.',
    basics: 'Web Basics Quiz',
    basicsText: 'The original bilingual multiple-choice quiz from your Web Grundlagen PDF.',
    neck: 'IHK App by Nick Questions',
    neckText: '10 direct PDF answers plus 55 focused study cards based on the topics listed in the new PDF.',
    quizMeta: '100 questions · 5 levels',
    studyMeta: '65 study questions · Questions & answers',
    open: 'Open',
    continue: 'Continue',
    combined: 'Combined progress',
    completed: 'items studied',
    total: 'Total study items',
    collections: 'Collections',
    reset: 'Reset all progress',
  },
  de: {
    title: 'Wähle dein Lernset',
    intro: 'Trainiere mit dem ursprünglichen Web-Grundlagen-Quiz oder lerne mit der neuen IHK-Fragen-und-Antworten-Sammlung.',
    basics: 'Web-Grundlagen-Quiz',
    basicsText: 'Das ursprüngliche zweisprachige Multiple-Choice-Quiz aus deinem Web-Grundlagen-PDF.',
    neck: 'IHK App by Nick Questions',
    neckText: '10 direkte PDF-Antworten plus 55 Lernkarten aus den Themen, die im neuen PDF aufgeführt sind.',
    quizMeta: '100 Fragen · 5 Level',
    studyMeta: '65 Lernfragen · Fragen & Antworten',
    open: 'Öffnen',
    continue: 'Fortsetzen',
    combined: 'Gesamtfortschritt',
    completed: 'Elemente gelernt',
    total: 'Lernelemente insgesamt',
    collections: 'Lernsets',
    reset: 'Gesamten Fortschritt zurücksetzen',
  },
}

export default function LibraryPage() {
  const { language } = useLanguage()
  const { progress, resetProgress } = useProgress()
  const labels = copy[language]
  const quizAnswered = Object.keys(progress.answers).length
  const studyViewed = progress.studyViewed.length
  const totalItems = questions.length + neckQuestions.length
  const completed = quizAnswered + studyViewed
  const percent = Math.round((completed / totalItems) * 100)

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
              <span style={{ width: `${Math.round((studyViewed / 65) * 100)}%` }} />
            </div>
            <strong>{Math.round((studyViewed / 65) * 100)}%</strong>
          </div>
          <Link to="/neck-questions" className={styles.action}>
            {studyViewed ? labels.continue : labels.open}
            <ArrowRight size={18} />
          </Link>
        </article>
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
