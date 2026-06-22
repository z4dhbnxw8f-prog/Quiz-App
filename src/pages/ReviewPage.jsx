import { ArrowRight, BookmarkCheck, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { getQuestionById, questionTypeLabels } from '../questions'
import styles from './ReviewPage.module.css'

export default function ReviewPage() {
  const { progress, weakTopics } = useProgress()
  const wrongQuestions = progress.wrongQuestionIds
    .map(getQuestionById)
    .filter(Boolean)

  return (
    <div className={styles.page}>
      <header className={styles.heading}>
        <div>
          <h1>Review what needs another look</h1>
          <p>
            Missed questions stay here until you answer them correctly in a
            retry session.
          </p>
        </div>
        {wrongQuestions.length > 0 ? (
          <Link to="/practice?mode=review">
            <RotateCcw size={19} />
            Retry wrong questions
          </Link>
        ) : null}
      </header>

      {weakTopics.length > 0 ? (
        <section className={styles.weakStrip}>
          <strong>Weak topics</strong>
          <div>
            {weakTopics.map((entry) => (
              <Link
                key={entry.topic}
                to={`/practice?topic=${encodeURIComponent(entry.topic)}`}
              >
                {entry.topic}
                <span>{entry.accuracy}%</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {wrongQuestions.length > 0 ? (
        <section className={styles.list}>
          {wrongQuestions.map((question, index) => (
            <article key={question.id}>
              <span className={styles.number}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className={styles.questionText}>
                <div>
                  <span>{question.topic}</span>
                  <span>{questionTypeLabels[question.type]}</span>
                </div>
                <h2>{question.prompt}</h2>
                <p>{question.explanation}</p>
              </div>
              <Link to={`/practice?topic=${encodeURIComponent(question.topic)}`}>
                Practice topic
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <section className={styles.empty}>
          <div>
            <BookmarkCheck size={42} />
          </div>
          <h2>Your review list is clear</h2>
          <p>
            Wrong answers will appear here with their explanations and retry
            links.
          </p>
          <Link to="/practice">Start practice</Link>
        </section>
      )}
    </div>
  )
}
