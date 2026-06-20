import type { Document } from '../types'

export function searchDocuments(docs: Document[], query: string): Document[] {
  const q = query.trim().toLowerCase()
  if (!q) return docs
  return docs.filter(
    (d) => d.title.toLowerCase().includes(q) || d.body.toLowerCase().includes(q)
  )
}
