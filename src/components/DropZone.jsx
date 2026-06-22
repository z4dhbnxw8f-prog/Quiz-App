import { useDroppable } from '@dnd-kit/core'
import styles from './DropZone.module.css'

export default function DropZone({
  id,
  data,
  children,
  label,
  status = 'neutral',
  onClick,
  className = '',
}) {
  const { isOver, setNodeRef } = useDroppable({ id, data })

  return (
    <div
      ref={setNodeRef}
      role="button"
      tabIndex={0}
      data-testid="drop-zone"
      data-drop-id={id}
      className={`${styles.zone} ${styles[status]} ${
        isOver ? styles.over : ''
      } ${className}`}
      onClick={onClick}
      onKeyDown={(event) => {
        if ((event.key === 'Enter' || event.key === ' ') && onClick) {
          event.preventDefault()
          onClick()
        }
      }}
    >
      {children ?? <span className={styles.placeholder}>{label}</span>}
    </div>
  )
}
