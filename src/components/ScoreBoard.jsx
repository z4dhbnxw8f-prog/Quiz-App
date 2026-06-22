import { Check, Circle, Code2, X } from 'lucide-react'
import styles from './ScoreBoard.module.css'

export default function ScoreBoard({
  current,
  total,
  score,
  topic,
  results,
}) {
  const percent = Math.round((current / total) * 100)

  return (
    <aside className={styles.board} aria-label="Practice score">
      <div className={styles.topline}>
        <span>
          Question {current} of {total}
        </span>
        <strong>{score} correct</strong>
      </div>

      <div className={styles.score}>
        <strong>{score}</strong>
        <span>correct</span>
      </div>

      <div className={styles.progressTrack} aria-label={`${percent}% complete`}>
        <span style={{ width: `${percent}%` }} />
      </div>
      <p className={styles.percent}>{percent}% complete</p>

      <div className={styles.divider} />
      <h2>Question overview</h2>
      <ol className={styles.overview}>
        {Array.from({ length: total }, (_, index) => {
          const result = results[index]
          const active = index + 1 === current
          return (
            <li
              key={index}
              className={`${active ? styles.active : ''} ${
                result === true ? styles.done : ''
              } ${result === false ? styles.missed : ''}`}
            >
              <span>{index + 1}</span>
              {result === true ? <Check size={15} /> : null}
              {result === false ? <X size={15} /> : null}
              {result === undefined ? <Circle size={8} fill="currentColor" /> : null}
            </li>
          )
        })}
      </ol>

      <p className={styles.topic}>
        <Code2 size={18} />
        {topic}
      </p>
    </aside>
  )
}
