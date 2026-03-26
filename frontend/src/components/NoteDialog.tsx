'use client'

import type { NotesInput } from '#/schema/notes'
import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Field, FieldGroup } from './ui/field'
import { Input } from './ui/input'
import { Label } from './ui/label'

const NoteDialog = ({
  submitFunction,
}: {
  submitFunction: (data: NotesInput) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const data = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    }
    console.log('Submitted!', data)

    try {
      await submitFunction(data)
      setIsOpen(false)
    } catch (error) {
      console.error('Function failed')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Create New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle>Create New Note</DialogTitle>
            <DialogDescription>Create a new note</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Note Title</Label>
              <Input id="title" name="title" defaultValue="New Note" />
            </Field>
            <Field>
              <Label htmlFor="content-1">Content</Label>
              <Input id="content" name="content" defaultValue="" />
            </Field>
          </FieldGroup>
          <DialogFooter className="bg-background">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NoteDialog
