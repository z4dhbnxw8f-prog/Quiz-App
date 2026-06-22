# IHK Drag & Drop Trainer

A React + Vite study app for practicing IHK Junior Web Developer drag-and-drop
questions. Progress is saved in the browser with `localStorage`; no backend is
required.

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

## Add more questions

Edit `src/questions.js`. Use the existing `match`, `order`, or `group` examples
and include:

- `id`
- `topic`
- `type`
- `prompt`
- `items`
- `correctAnswer`
- `explanation`

The home topic list, practice sessions, progress view, and review system all
read from that single file.
# Quiz-App
