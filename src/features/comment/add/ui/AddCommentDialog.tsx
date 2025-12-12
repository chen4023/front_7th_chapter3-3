import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Textarea,
} from "@/shared/ui"
import { useAddCommentMutation } from "../api/useAddCommentMutation"

interface AddCommentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  postId: number | null
}

export const AddCommentDialog = ({
  open,
  onOpenChange,
  postId,
}: AddCommentDialogProps) => {
  const [body, setBody] = useState("")

  const { mutate: addComment, isPending } = useAddCommentMutation()

  const handleSubmit = () => {
    if (!postId) return
    addComment(
      { body, postId, userId: 1 },
      {
        onSuccess: () => {
          onOpenChange(false)
          setBody("")
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "추가 중..." : "댓글 추가"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

