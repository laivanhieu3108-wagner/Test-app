import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'todo-app.todos'

const FILTERS = {
  all: { label: 'Tất cả', test: () => true },
  active: { label: 'Chưa xong', test: (t) => !t.done },
  done: { label: 'Đã xong', test: (t) => t.done },
}

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function TodoItem({ todo, onToggle, onDelete, onRename }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)

  const commit = () => {
    const text = draft.trim()
    if (text) onRename(todo.id, text)
    else setDraft(todo.text)
    setEditing(false)
  }

  return (
    <li className={`todo ${todo.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={todo.done ? 'Đánh dấu chưa xong' : 'Đánh dấu đã xong'}
      />
      {editing ? (
        <input
          className="edit"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit()
            if (e.key === 'Escape') {
              setDraft(todo.text)
              setEditing(false)
            }
          }}
        />
      ) : (
        <span
          className="text"
          onDoubleClick={() => {
            setDraft(todo.text)
            setEditing(true)
          }}
          title="Nhấp đúp để sửa"
        >
          {todo.text}
        </span>
      )}
      <button
        className="delete"
        onClick={() => onDelete(todo.id)}
        aria-label="Xoá công việc"
      >
        ×
      </button>
    </li>
  )
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch {
      // Bỏ qua nếu trình duyệt chặn localStorage
    }
  }, [todos])

  const visible = useMemo(
    () => todos.filter(FILTERS[filter].test),
    [todos, filter],
  )
  const remaining = todos.filter((t) => !t.done).length
  const hasDone = todos.some((t) => t.done)

  const addTodo = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, done: false },
    ])
    setInput('')
  }

  const toggle = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )
  const remove = (id) => setTodos((prev) => prev.filter((t) => t.id !== id))
  const rename = (id, text) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)))
  const clearDone = () => setTodos((prev) => prev.filter((t) => !t.done))
  const toggleAll = () => {
    const allDone = todos.every((t) => t.done)
    setTodos((prev) => prev.map((t) => ({ ...t, done: !allDone })))
  }

  return (
    <main className="app">
      <h1>Việc cần làm</h1>

      <form className="add" onSubmit={addTodo}>
        {todos.length > 0 && (
          <button
            type="button"
            className="toggle-all"
            onClick={toggleAll}
            title="Đánh dấu tất cả"
            aria-label="Đánh dấu tất cả"
          >
            ✓
          </button>
        )}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Bạn cần làm gì?"
          aria-label="Công việc mới"
          autoFocus
        />
        <button type="submit" disabled={!input.trim()}>
          Thêm
        </button>
      </form>

      {todos.length === 0 ? (
        <p className="empty">Chưa có công việc nào. Thêm một việc ở trên nhé!</p>
      ) : (
        <>
          <ul className="list">
            {visible.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggle}
                onDelete={remove}
                onRename={rename}
              />
            ))}
            {visible.length === 0 && (
              <li className="empty">Không có công việc nào ở mục này.</li>
            )}
          </ul>

          <footer className="footer">
            <span>Còn {remaining} việc</span>
            <div className="filters">
              {Object.entries(FILTERS).map(([key, { label }]) => (
                <button
                  key={key}
                  className={filter === key ? 'active' : ''}
                  onClick={() => setFilter(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              className="clear"
              onClick={clearDone}
              disabled={!hasDone}
            >
              Xoá việc đã xong
            </button>
          </footer>
        </>
      )}
    </main>
  )
}
