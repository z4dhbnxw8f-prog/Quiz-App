import { GripVertical } from 'lucide-react'
import styles from './DragItem.module.css'

export default function DragItem({
  children,
  status = 'neutral',
  selected = false,
  disabled = false,
  compact = false,
  onClick,
  dragAttributes,
  dragListeners,
  setNodeRef,
  style,
  className = '',
}) {
  return (
    <button
      ref={setNodeRef}
      type="button"
      data-testid="drag-item"
      data-drag-label={typeof children === 'string' ? children : undefined}
      className={`${styles.item} ${styles[status]} ${
        selected ? styles.selected : ''
      } ${compact ? styles.compact : ''} ${className}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...dragAttributes}
      {...dragListeners}
      aria-pressed={selected}
    >
      <GripVertical className={styles.grip} size={20} aria-hidden="true" />
      <span>{children}</span>
    </button>
  )
}
