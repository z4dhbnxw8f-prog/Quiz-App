export function shuffled(items) {
  const copy = [...items]

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]]
  }

  // A shuffled ordering question should not begin already solved.
  if (copy.length > 1 && copy.every((item, index) => item === items[index])) {
    ;[copy[0], copy[1]] = [copy[1], copy[0]]
  }

  return copy
}

export function createInitialAnswer(question) {
  if (question.type === 'order') {
    return shuffled(question.items)
  }

  return {}
}

export function isQuestionCorrect(question, answer) {
  if (question.type === 'order') {
    return question.correctAnswer.every((item, index) => answer[index] === item)
  }

  if (question.type === 'match') {
    return question.items.every((term) => {
      const definition = question.correctAnswer[term]
      return answer[definition] === term
    })
  }

  return Object.entries(question.correctAnswer).every(([category, items]) =>
    items.every((item) => answer[item] === category),
  )
}

export function questionIsComplete(question, answer) {
  if (question.type === 'order') {
    return answer.length === question.items.length
  }

  if (question.type === 'match') {
    return Object.keys(answer).length === question.items.length
  }

  return question.items.every((item) => Boolean(answer[item]))
}

export function getWeakTopics(topicStats) {
  return Object.entries(topicStats)
    .filter(([, stats]) => stats.answered > 0)
    .map(([topic, stats]) => ({
      topic,
      answered: stats.answered,
      correct: stats.correct,
      accuracy: Math.round((stats.correct / stats.answered) * 100),
    }))
    .filter((entry) => entry.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
}
