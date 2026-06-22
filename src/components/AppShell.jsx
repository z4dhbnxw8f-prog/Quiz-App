import { CodeXml } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import styles from './AppShell.module.css'

export default function AppShell({ children }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">
            <CodeXml size={25} strokeWidth={2.6} />
          </span>
          <span>WebWise</span>
        </Link>

        <div className={styles.language} aria-label="Language / Sprache">
          {['en', 'de'].map((item) => (
            <button
              key={item}
              type="button"
              className={language === item ? styles.activeLanguage : ''}
              aria-pressed={language === item}
              onClick={() => setLanguage(item)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
