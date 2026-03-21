import type { NotesGenerated } from '#/schema/notes'
import { createServerFn } from '@tanstack/react-start'
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchAllNotes = createServerFn().handler(
  async (): Promise<NotesGenerated[]> => {
    const notes = await fetch(`${process.env.API_URL}/api/notes`, {
      method: 'GET',
    })

    if (!notes.ok) {
      throw new Error("RUSAK")
    }

    return notes.json()
  }
)