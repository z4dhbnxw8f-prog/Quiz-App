import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useDraggable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import DragItem from './DragItem'
import DropZone from './DropZone'
import styles from './QuestionTypes.module.css'

function useQuestionSensors() {
  return useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 140, tolerance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )
}

function DraggableTerm({
  id,
  item,
  children,
  status,
  selected,
  disabled,
  compact,
  onClick,
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { item },
      disabled,
    })

  return (
    <DragItem
      setNodeRef={setNodeRef}
      dragAttributes={attributes}
      dragListeners={listeners}
      status={status}
      selected={selected}
      disabled={disabled}
      compact={compact}
      onClick={onClick}
      style={{
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.25 : 1,
      }}
    >
      {children}
    </DragItem>
  )
}

function SortableItem({ id, index, question, checked }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: checked })

  let status = 'neutral'
  if (checked) {
    status = question.correctAnswer[index] === id ? 'correct' : 'wrong'
  }

  return (
    <DragItem
      setNodeRef={setNodeRef}
      dragAttributes={attributes}
      dragListeners={listeners}
      status={status}
      disabled={checked}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
      }}
    >
      <span className={styles.orderNumber}>{index + 1}</span>
      {id}
    </DragItem>
  )
}

function getMatchStatus(question, answer, definition, checked) {
  if (!checked) return 'neutral'
  const expectedTerm = question.items.find(
    (term) => question.correctAnswer[term] === definition,
  )
  return answer[definition] === expectedTerm ? 'correct' : 'wrong'
}

export function MatchQuestion({ question, answer, setAnswer, checked }) {
  const sensors = useQuestionSensors()
  const [selected, setSelected] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  const definitions = Object.values(question.correctAnswer)
  const assignedTerms = new Set(Object.values(answer))
  const availableTerms = question.items.filter((item) => !assignedTerms.has(item))

  const assign = (term, definition) => {
    if (!term || checked) return

    setAnswer((current) => {
      const next = { ...current }
      Object.keys(next).forEach((key) => {
        if (next[key] === term) delete next[key]
      })
      next[definition] = term
      return next
    })
    setSelected(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActiveItem(active.data.current?.item)}
      onDragCancel={() => setActiveItem(null)}
      onDragEnd={({ active, over }) => {
        const definition = over?.data.current?.definition
        if (definition) assign(active.data.current?.item, definition)
        setActiveItem(null)
      }}
    >
      <div className={styles.matchLayout}>
        <div className={styles.termBank} aria-label="Terms to match">
          {availableTerms.length > 0 ? (
            availableTerms.map((term) => (
              <DraggableTerm
                key={term}
                id={`term-${question.id}-${term}`}
                item={term}
                selected={selected === term}
                disabled={checked}
                onClick={() => setSelected(term)}
              >
                {term}
              </DraggableTerm>
            ))
          ) : (
            <p className={styles.bankEmpty}>All terms have been placed.</p>
          )}
        </div>

        <div className={styles.definitionList}>
          {definitions.map((definition) => {
            const term = answer[definition]
            return (
              <div key={definition} className={styles.definitionRow}>
                <DropZone
                  id={`definition-${question.id}-${definition}`}
                  data={{ definition }}
                  label={selected ? `Place ${selected} here` : 'Drop a term here'}
                  status={getMatchStatus(
                    question,
                    answer,
                    definition,
                    checked,
                  )}
                  onClick={() => assign(selected, definition)}
                  className={styles.matchZone}
                >
                  <div className={styles.answerSlot}>
                    {term ? (
                      <DraggableTerm
                        id={`placed-${question.id}-${term}`}
                        item={term}
                        status={getMatchStatus(
                          question,
                          answer,
                          definition,
                          checked,
                        )}
                        disabled={checked}
                        compact
                        onClick={(event) => {
                          event.stopPropagation()
                          setSelected(term)
                        }}
                      >
                        {term}
                      </DraggableTerm>
                    ) : (
                      <span className={styles.emptySlot} aria-hidden="true" />
                    )}
                  </div>
                  <span className={styles.definitionText}>{definition}</span>
                </DropZone>
              </div>
            )
          })}
        </div>
      </div>

      <DragOverlay>
        {activeItem ? (
          <div className={styles.dragOverlay}>{activeItem}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export function OrderQuestion({ question, answer, setAnswer, checked }) {
  const sensors = useQuestionSensors()

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (!over || active.id === over.id || checked) return
        setAnswer((items) => {
          const oldIndex = items.indexOf(active.id)
          const newIndex = items.indexOf(over.id)
          return arrayMove(items, oldIndex, newIndex)
        })
      }}
    >
      <SortableContext items={answer} strategy={verticalListSortingStrategy}>
        <div className={styles.orderList}>
          {answer.map((item, index) => (
            <SortableItem
              key={item}
              id={item}
              index={index}
              question={question}
              checked={checked}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

function findCorrectGroup(question, item) {
  return Object.entries(question.correctAnswer).find(([, items]) =>
    items.includes(item),
  )?.[0]
}

export function GroupQuestion({ question, answer, setAnswer, checked }) {
  const sensors = useQuestionSensors()
  const [selected, setSelected] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  const categories = Object.keys(question.correctAnswer)
  const unassigned = question.items.filter((item) => !answer[item])

  const assign = (item, category) => {
    if (!item || checked) return
    setAnswer((current) => ({ ...current, [item]: category }))
    setSelected(null)
  }

  const statusFor = (item) => {
    if (!checked) return 'neutral'
    return answer[item] === findCorrectGroup(question, item) ? 'correct' : 'wrong'
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActiveItem(active.data.current?.item)}
      onDragCancel={() => setActiveItem(null)}
      onDragEnd={({ active, over }) => {
        const category = over?.data.current?.category
        if (category) assign(active.data.current?.item, category)
        setActiveItem(null)
      }}
    >
      <div className={styles.groupBank} aria-label="Concepts to group">
        {unassigned.map((item) => (
          <DraggableTerm
            key={item}
            id={`group-item-${question.id}-${item}`}
            item={item}
            selected={selected === item}
            status={checked ? 'wrong' : 'neutral'}
            disabled={checked}
            compact
            onClick={() => setSelected(item)}
          >
            {item}
          </DraggableTerm>
        ))}
        {unassigned.length === 0 ? (
          <p className={styles.bankEmpty}>Every concept has a category.</p>
        ) : null}
      </div>

      <div className={styles.groupGrid}>
        {categories.map((category) => {
          const categoryItems = question.items.filter(
            (item) => answer[item] === category,
          )

          return (
            <section key={category} className={styles.groupSection}>
              <h3>
                <button
                  type="button"
                  onClick={() => assign(selected, category)}
                  disabled={checked}
                  title={
                    selected
                      ? `Place ${selected} in ${category}`
                      : `Select a concept, then choose ${category}`
                  }
                >
                  {category}
                </button>
              </h3>
              <DropZone
                id={`category-${question.id}-${category}`}
                data={{ category }}
                label={
                  selected
                    ? `Place ${selected} in ${category}`
                    : 'Drop concepts here'
                }
                onClick={() => assign(selected, category)}
                className={styles.groupZone}
              >
                {categoryItems.length > 0 ? (
                  <div className={styles.groupItems}>
                    {categoryItems.map((item) => (
                      <DraggableTerm
                        key={item}
                        id={`placed-group-${question.id}-${item}`}
                        item={item}
                        selected={selected === item}
                        status={statusFor(item)}
                        disabled={checked}
                        compact
                        onClick={(event) => {
                          event.stopPropagation()
                          setSelected(item)
                        }}
                      >
                        {item}
                      </DraggableTerm>
                    ))}
                  </div>
                ) : null}
              </DropZone>
            </section>
          )
        })}
      </div>

      <DragOverlay>
        {activeItem ? (
          <div className={styles.dragOverlay}>{activeItem}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
