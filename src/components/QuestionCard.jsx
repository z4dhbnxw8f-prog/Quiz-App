import { ArrowRight, Check, Info, SkipForward, X } from 'lucide-react'
import { useState } from 'react'
import {
  createInitialAnswer,
  isQuestionCorrect,
  questionIsComplete,
} from '../utils/questionUtils'
import {
  GroupQuestion,
  MatchQuestion,
  OrderQuestion,
} from './questionTypes'
import styles from './QuestionCard.module.css'

const typeInstructions = {
  match: 'Drag each term onto the matching definition. You can also tap a term and then tap a target.',
  order: 'Drag the cards into the correct sequence.',
  group: 'Drag each concept into the category where it belongs. Tap controls also work.',
}

export default function QuestionCard({
  question,
  onResult,
  onNext,
  onSkip,
  isLast,
}) {
  const [answer, setAnswer] = useState(() => createInitialAnswer(question))
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [message, setMessage] = useState('')

  const checkAnswer = () => {
    if (!questionIsComplete(question, answer)) {
      setMessage('Place every item before checking your answer.')
      return
    }

    const result = isQuestionCorrect(question, answer)
    setCorrect(result)
    setChecked(true)
    setMessage('')
    onResult(result)
  }

  const exerciseProps = {
    question,
    answer,
    setAnswer,
    checked,
  }

  return (
    <article className={styles.card}>
      <p className={styles.topic}>{question.topic}</p>
      <h1>{question.prompt}</h1>

      <div className={styles.instruction}>
        <Info size={18} aria-hidden="true" />
        <span>{typeInstructions[question.type]}</span>
      </div>

      <div className={styles.exercise}>
        {question.type === 'match' ? (
          <MatchQuestion {...exerciseProps} />
        ) : null}
        {question.type === 'order' ? (
          <OrderQuestion {...exerciseProps} />
        ) : null}
        {question.type === 'group' ? (
          <GroupQuestion {...exerciseProps} />
        ) : null}
      </div>

      {message ? (
        <p className={styles.validation} role="alert">
          {message}
        </p>
      ) : null}

      {checked ? (
        <div
          className={`${styles.feedback} ${
            correct ? styles.feedbackCorrect : styles.feedbackWrong
          }`}
          role="status"
        >
          <span className={styles.feedbackIcon}>
            {correct ? <Check /> : <X />}
          </span>
          <div>
            <h2>{correct ? 'Correct — nicely done.' : 'Not quite yet.'}</h2>
            <p>{question.explanation}</p>
          </div>
        </div>
      ) : null}

      <div className={styles.actions}>
        {!checked ? (
          <>
            <button type="button" className={styles.primary} onClick={checkAnswer}>
              <Check size={20} />
              Check Answer
            </button>
            <button type="button" className={styles.secondary} onClick={onSkip}>
              <SkipForward size={19} />
              Skip
            </button>
          </>
        ) : (
          <button type="button" className={styles.primary} onClick={onNext}>
            {isLast ? 'Finish Session' : 'Next Question'}
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </article>
  )
}
