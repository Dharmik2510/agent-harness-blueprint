import { useState } from 'react'
import { searchDocuments } from './lib/search'
import type { Document } from './types'

const SAMPLE_DOCS: Document[] = [
  { id: '1', title: 'Harness basics', body: 'A harness is the environment around the AI model.' },
  { id: '2', title: 'Copilot setup', body: 'Use copilot-instructions.md for project-wide rules.' },
  { id: '3', title: 'Verification', body: 'Always run tests before claiming done.' }
]

export default function App() {
  const [query, setQuery] = useState('')
  const results = searchDocuments(SAMPLE_DOCS, query)

  return (
    <div className="app">
      <header>
        <h1>Knowledge Hub</h1>
        <p>Team document search — lab capstone app</p>
      </header>
      <main>
        <label htmlFor="search">Search documents</label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search..."
        />
        <ul className="results">
          {results.map((doc) => (
            <li key={doc.id}>
              <strong>{doc.title}</strong>
              <p>{doc.body}</p>
            </li>
          ))}
        </ul>
        {query && results.length === 0 && <p className="empty">No matches</p>}
      </main>
      <footer>
        <span>{SAMPLE_DOCS.length} documents indexed</span>
      </footer>
    </div>
  )
}
