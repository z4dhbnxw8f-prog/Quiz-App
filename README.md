# WebWise IHK Quiz App

A bilingual English/German study app built with React and Vite. It includes:

- A 100-question Web Basics multiple-choice quiz split into five levels.
- “IHK App by Nick Questions,” with 65 question-and-answer study cards.
- Saved quiz and study progress using `localStorage`.
- Responsive desktop and mobile layouts.
- Single-answer, multiple-answer, answer-reveal, scoring, and review flows.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Other commands

```bash
npm run build
npm run lint
npm run preview
```

## Question data

- `src/questions.js` contains the 100-question Web Basics quiz.
- `src/neckQuestions.js` contains the 65 “IHK App by Nick Questions” study
  cards.

Both collections provide English and German content.

## Technology

- React 19
- React Router
- Vite
- CSS Modules
- Lucide React
