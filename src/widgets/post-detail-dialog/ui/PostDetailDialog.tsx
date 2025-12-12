import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui"
import { highlightText } from "@/shared/lib"
import { usePostDialogStore, usePostsFilterStore } from "@/features/post"
import { CommentsList } from "./CommentsList"

export const PostDetailDialog = () => {
  const { showPostDetailDialog, selectedPost, closePostDetailDialog } =
    usePostDialogStore()
  const { activeSearch } = usePostsFilterStore()

  if (!selectedPost) return null

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={closePostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {highlightText(selectedPost.title, activeSearch)}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost.body, activeSearch)}</p>
          <CommentsList postId={selectedPost.id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
