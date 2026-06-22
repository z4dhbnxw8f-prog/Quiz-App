import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import { LanguageProvider } from './hooks/useLanguage'
import { ProgressProvider } from './hooks/useProgress'
import HomePage from './pages/HomePage'
import LibraryPage from './pages/LibraryPage'
import NeckStudyPage from './pages/NeckStudyPage'
import PracticePage from './pages/PracticePage'

export default function App() {
  return (
    <LanguageProvider>
      <ProgressProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<LibraryPage />} />
            <Route path="/web-basics" element={<HomePage />} />
            <Route path="/quiz/:level" element={<PracticePage />} />
            <Route path="/neck-questions" element={<NeckStudyPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </ProgressProvider>
    </LanguageProvider>
  )
}
