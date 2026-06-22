/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'webwise-language'
const LanguageContext = createContext(null)

function getInitialLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'de' || saved === 'en') return saved
  return navigator.language?.toLowerCase().startsWith('de') ? 'de' : 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (nextLanguage) => {
    localStorage.setItem(STORAGE_KEY, nextLanguage)
    document.documentElement.lang = nextLanguage
    setLanguageState(nextLanguage)
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (content) => content?.[language] ?? content,
    }),
    [language],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
