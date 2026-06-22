import { ArrowLeft, ArrowRight, Check, ListChecks, RotateCcw, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { useProgress } from '../hooks/useProgress'
import { getLevelQuestions, levels, questions } from '../questions'
import styles from './HomePage.module.css'

const copy = {
  en: {
    title: 'Master Web Basics. One level at a time.',
    intro: '100 questions. 5 levels. Build your web foundations step by step and keep your progress.',
    level: 'Level',
    questions: 'questions',
    start: 'Start',
    continue: 'Continue',
    review: 'Review',
    overall: 'Overall progress',
    answered: 'questions answered',
    total: 'Total questions',
    levels: 'Levels',
    reset: 'Reset progress',
  },
  de: {
    title: 'Web-Grundlagen meistern. Level für Level.',
    intro: '100 Fragen. 5 Level. Baue dein Webwissen Schritt für Schritt auf und speichere deinen Fortschritt.',
    level: 'Level',
    questions: 'Fragen',
    start: 'Starten',
    continue: 'Fortsetzen',
    review: 'Wiederholen',
    overall: 'Gesamtfortschritt',
    answered: 'Fragen beantwortet',
    total: 'Fragen insgesamt',
    levels: 'Level',
    reset: 'Fortschritt zurücksetzen',
  },
}

export default function HomePage() {
  const { language, t } = useLanguage()
  const { progress, resetProgress } = useProgress()
  const labels = copy[language]
  const answered = Object.keys(progress.answers).length
  const overallPercent = Math.round((answered / questions.length) * 100)

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.libraryBack}>
        <ArrowLeft size={17} />
        {language === 'de' ? 'Alle Lernsets' : 'All study sets'}
      </Link>
      <section className={styles.intro}>
        <div>
          <h1>{labels.title}</h1>
          <p>{labels.intro}</p>
        </div>
        <div className={styles.codeMark} aria-hidden="true">
          <span className={styles.dot} />
          <span>&lt;/&gt;</span>
        </div>
      </section>

      <section className={styles.levelList} aria-label={labels.levels}>
        {levels.map((level) => {
          const levelQuestions = getLevelQuestions(level.id)
          const completed = levelQuestions.filter(
            (item) => progress.answers[item.id] !== undefined,
          ).length
          const percent = Math.round((completed / levelQuestions.length) * 100)
          const action =
            completed === 20
              ? labels.review
              : completed > 0
                ? labels.continue
                : labels.start

          return (
            <article key={level.id} className={styles.levelRow}>
              <div className={`${styles.levelNumber} ${styles[level.color]}`}>
                {completed === 20 ? <Check size={28} /> : level.id}
              </div>
              <div className={styles.levelCopy}>
                <h2>
                  {labels.level} {level.id} — {t(level.title)}
                </h2>
                <p>{t(level.description)}</p>
                <span>20 {labels.questions}</span>
              </div>
              <div className={styles.levelProgress}>
                <div>
                  <span style={{ width: `${percent}%` }} />
                </div>
                <strong>{percent}%</strong>
              </div>
              <Link to={`/quiz/${level.id}`} className={styles.levelAction}>
                {action}
                <ArrowRight size={17} />
              </Link>
            </article>
          )
        })}
      </section>

      <section className={styles.summary}>
        <div className={styles.progressCircle} style={{ '--progress': `${overallPercent * 3.6}deg` }}>
          <span>{overallPercent}%</span>
        </div>
        <div className={styles.summaryLead}>
          <strong>{labels.overall}</strong>
          <span>
            {answered} / 100 {labels.answered}
          </span>
        </div>
        <div className={styles.summaryStat}>
          <ListChecks size={23} />
          <strong>100</strong>
          <span>{labels.total}</span>
        </div>
        <div className={styles.summaryStat}>
          <Trophy size={23} />
          <strong>5</strong>
          <span>{labels.levels}</span>
        </div>
        {answered > 0 ? (
          <button type="button" className={styles.reset} onClick={resetProgress}>
            <RotateCcw size={16} />
            {labels.reset}
          </button>
        ) : null}
      </section>
    </div>
  )
}
