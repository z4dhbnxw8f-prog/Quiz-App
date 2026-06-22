import { BarChart3, RotateCcw, Target, Trophy, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { topics } from '../questions'
import styles from './ProgressPage.module.css'

export default function ProgressPage() {
  const { progress, weakTopics, resetProgress } = useProgress()
  const accuracy =
    progress.totalAnswered > 0
      ? Math.round((progress.correctAnswers / progress.totalAnswered) * 100)
      : 0

  const reset = () => {
    if (window.confirm('Reset all saved practice progress?')) {
      resetProgress()
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.heading}>
        <div>
          <h1>Your progress</h1>
          <p>Stored locally in this browser, ready for your next study session.</p>
        </div>
        <button type="button" onClick={reset}>
          <RotateCcw size={17} />
          Reset progress
        </button>
      </header>

      <section className={styles.stats}>
        <article>
          <BarChart3 />
          <strong>{progress.totalAnswered}</strong>
          <span>Questions answered</span>
        </article>
        <article>
          <Target />
          <strong>{accuracy}%</strong>
          <span>Overall accuracy</span>
        </article>
        <article>
          <Trophy />
          <strong>{progress.bestScore}</strong>
          <span>Best session score</span>
        </article>
        <article>
          <XCircle />
          <strong>{progress.wrongQuestionIds.length}</strong>
          <span>Questions to review</span>
        </article>
      </section>

      <section className={styles.detailGrid}>
        <div className={styles.topicPanel}>
          <div className={styles.panelHeading}>
            <h2>Topic accuracy</h2>
            <span>{topics.length} topics</span>
          </div>
          <div className={styles.topicRows}>
            {topics.map((topic) => {
              const topicProgress = progress.topicStats[topic] ?? {
                answered: 0,
                correct: 0,
              }
              const topicAccuracy =
                topicProgress.answered > 0
                  ? Math.round(
                      (topicProgress.correct / topicProgress.answered) * 100,
                    )
                  : 0
              return (
                <div key={topic} className={styles.topicRow}>
                  <div>
                    <strong>{topic}</strong>
                    <span>{topicProgress.answered} answered</span>
                  </div>
                  <div className={styles.bar}>
                    <span style={{ width: `${topicAccuracy}%` }} />
                  </div>
                  <b>{topicProgress.answered ? `${topicAccuracy}%` : '—'}</b>
                </div>
              )
            })}
          </div>
        </div>

        <aside className={styles.weakPanel}>
          <h2>Weak topics</h2>
          <p>Topics below 70% accuracy appear here.</p>
          {weakTopics.length > 0 ? (
            <ul>
              {weakTopics.map((entry) => (
                <li key={entry.topic}>
                  <div>
                    <strong>{entry.topic}</strong>
                    <span>{entry.correct} correct of {entry.answered}</span>
                  </div>
                  <b>{entry.accuracy}%</b>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyWeak}>
              {progress.totalAnswered
                ? 'No weak topics right now. Keep the streak going.'
                : 'Complete a practice session to reveal your focus areas.'}
            </div>
          )}
          <Link to="/review">Open review</Link>
        </aside>
      </section>
    </div>
  )
}
