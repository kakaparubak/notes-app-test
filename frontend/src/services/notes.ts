import type { NotesGenerated, NotesId, NotesInput } from '#/schema/notes'
import { createServerFn } from '@tanstack/react-start'

export const fetchAllNotes = createServerFn().handler(
  async (): Promise<NotesGenerated[]> => {
    const apiBaseUrl = process.env.API_URL
    const apiURL = `${apiBaseUrl}/api/notes`
    const response = await fetch(apiURL, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch notes')
    }

    return response.json()
  },
)

export const fetchNoteById = createServerFn()
  .inputValidator((data: NotesId) => data)
  .handler(async ({ data }): Promise<NotesGenerated> => {
    const apiBaseUrl = process.env.API_URL
    const apiURL = `${apiBaseUrl}/api/notes/${data.id}`
    const response = await fetch(apiURL, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch notes')
    }

    return response.json()
  })

export const postNewNote = createServerFn()
  .inputValidator((data: NotesInput) => data)
  .handler(async ({ data }): Promise<NotesGenerated> => {
    const apiBaseUrl = process.env.API_URL
    const apiURL = `${apiBaseUrl}/api/notes`
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to create note')
    }

    return response.json()
  })

export const deleteNote = createServerFn()
  .inputValidator((data: NotesId) => data)
  .handler(async ({ data }): Promise<NotesGenerated> => {
    const apiBaseUrl = process.env.API_URL
    const apiURL = `${apiBaseUrl}/api/notes/${data.id}`

    const response = await fetch(apiURL, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete note')
    }

    return response.json()
  })
