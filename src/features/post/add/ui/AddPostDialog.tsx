import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Textarea,
} from "@/shared/ui"
import { useAddPostMutation } from "../api/useAddPostMutation"

interface AddPostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const AddPostDialog = ({ open, onOpenChange }: AddPostDialogProps) => {
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    userId: 1,
  })

  const { mutate: addPost, isPending } = useAddPostMutation()

  const handleSubmit = () => {
    addPost(newPost, {
      onSuccess: () => {
        onOpenChange(false)
        setNewPost({ title: "", body: "", userId: 1 })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) =>
              setNewPost({ ...newPost, userId: Number(e.target.value) })
            }
          />
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "추가 중..." : "게시물 추가"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

