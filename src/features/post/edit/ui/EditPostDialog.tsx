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
import { usePostDialogStore } from "../../model/store"
import { useUpdatePostMutation } from "../api/useUpdatePostMutation"

export const EditPostDialog = () => {
  const { showEditDialog, selectedPost, closeEditDialog } = usePostDialogStore()
  const [editedPost, setEditedPost] = useState<{
    title: string
    body: string
  }>({
    title: "",
    body: "",
  })

  const { mutate: updatePost, isPending } = useUpdatePostMutation()

  useEffect(() => {
    if (selectedPost) {
      setEditedPost({
        title: selectedPost.title,
        body: selectedPost.body,
      })
    }
  }, [selectedPost])

  const handleSubmit = () => {
    if (!selectedPost) return
    updatePost(
      { id: selectedPost.id, ...editedPost },
      {
        onSuccess: () => {
          closeEditDialog()
        },
      },
    )
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={closeEditDialog}>
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
