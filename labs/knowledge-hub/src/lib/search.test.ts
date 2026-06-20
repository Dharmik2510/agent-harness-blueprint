import { describe, it, expect } from 'vitest'
import { searchDocuments } from './search'
import type { Document } from '../types'

const docs: Document[] = [
  { id: '1', title: 'Alpha', body: 'first' },
  { id: '2', title: 'Beta', body: 'second' }
]

describe('searchDocuments', () => {
  it('returns all docs when query empty', () => {
    expect(searchDocuments(docs, '')).toHaveLength(2)
  })

  it('filters by title', () => {
    expect(searchDocuments(docs, 'alpha')).toHaveLength(1)
  })

  it('filters by body', () => {
    expect(searchDocuments(docs, 'second')).toHaveLength(1)
  })
})
