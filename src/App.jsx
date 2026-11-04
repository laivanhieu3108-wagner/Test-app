import { useState } from 'react'
import { TOPICS } from './data/topics'
import { useProgress } from './lib/progress'
import Home from './components/Home'
import TopicView from './components/TopicView'
import Practice from './components/Practice'
import './App.css'

export default function App() {
  const { progress, record, reset } = useProgress()
  const [topicId, setTopicId] = useState(null)
  const [mode, setMode] = useState(null)

  const topic = TOPICS.find((t) => t.id === topicId)

  let content
  if (!topic) {
    content = <Home progress={progress} onOpen={setTopicId} onReset={reset} />
  } else if (!mode) {
    content = (
      <TopicView
        topic={topic}
        progress={progress}
        onBack={() => setTopicId(null)}
        onStart={setMode}
      />
    )
  } else {
    content = (
      <Practice
        mode={mode}
        topic={topic}
        progress={progress}
        record={record}
        onExit={() => setMode(null)}
      />
    )
  }

  return <main className="app">{content}</main>
}
