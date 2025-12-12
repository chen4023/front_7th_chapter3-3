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
import { usePostDialogStore } from "../../model/store"
import { useAddPostMutation } from "../api/useAddPostMutation"

export const AddPostDialog = () => {
  const { showAddDialog, closeAddDialog } = usePostDialogStore()
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    userId: 1,
  })

  const { mutate: addPost, isPending } = useAddPostMutation()

  const handleSubmit = () => {
    addPost(newPost, {
      onSuccess: () => {
        closeAddDialog()
        setNewPost({ title: "", body: "", userId: 1 })
      },
    })
  }

  return (
    <Dialog open={showAddDialog} onOpenChange={closeAddDialog}>
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
