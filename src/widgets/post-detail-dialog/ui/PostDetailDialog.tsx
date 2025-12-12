import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui"
import { highlightText } from "@/shared/lib"
import { Post } from "@/entities/post"
import { CommentsList } from "./CommentsList"

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post | null
  searchQuery: string
}

export const PostDetailDialog = ({
  open,
  onOpenChange,
  post,
  searchQuery,
}: PostDetailDialogProps) => {
  if (!post) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post.body, searchQuery)}</p>
          <CommentsList postId={post.id} searchQuery={searchQuery} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

