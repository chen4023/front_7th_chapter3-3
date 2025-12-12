import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Textarea,
} from "@/shared/ui"
import { Comment } from "@/entities/comment"
import { useUpdateCommentMutation } from "../api/useUpdateCommentMutation"

interface EditCommentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  comment: Comment | null
}

export const EditCommentDialog = ({
  open,
  onOpenChange,
  comment,
}: EditCommentDialogProps) => {
  const [body, setBody] = useState("")

  const { mutate: updateComment, isPending } = useUpdateCommentMutation()

  useEffect(() => {
    if (comment) {
      setBody(comment.body)
    }
  }, [comment])

  const handleSubmit = () => {
    if (!comment) return
    updateComment(
      { id: comment.id, body, postId: comment.postId },
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
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "수정 중..." : "댓글 업데이트"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

