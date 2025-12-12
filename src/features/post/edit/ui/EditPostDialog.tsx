import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Textarea,
} from "@/shared/ui"
import { Post } from "@/entities/post"
import { useUpdatePostMutation } from "../api/useUpdatePostMutation"

interface EditPostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post | null
}

export const EditPostDialog = ({
  open,
  onOpenChange,
  post,
}: EditPostDialogProps) => {
  const [editedPost, setEditedPost] = useState<{
    title: string
    body: string
  }>({
    title: "",
    body: "",
  })

  const { mutate: updatePost, isPending } = useUpdatePostMutation()

  useEffect(() => {
    if (post) {
      setEditedPost({
        title: post.title,
        body: post.body,
      })
    }
  }, [post])

  const handleSubmit = () => {
    if (!post) return
    updatePost(
      { id: post.id, ...editedPost },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={editedPost.title}
            onChange={(e) =>
              setEditedPost({ ...editedPost, title: e.target.value })
            }
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={editedPost.body}
            onChange={(e) =>
              setEditedPost({ ...editedPost, body: e.target.value })
            }
          />
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "수정 중..." : "게시물 업데이트"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

