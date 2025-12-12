import { useState } from "react"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "@/shared/ui"
import { highlightText } from "@/shared/lib"
import { Comment, useCommentsQuery } from "@/entities/comment"
import {
  useDeleteCommentMutation,
  useLikeCommentMutation,
  AddCommentDialog,
  EditCommentDialog,
} from "@/features/comment"

interface CommentsListProps {
  postId: number
  searchQuery: string
}

export const CommentsList = ({ postId, searchQuery }: CommentsListProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  const { data } = useCommentsQuery(postId)
  const { mutate: deleteComment } = useDeleteCommentMutation()
  const { mutate: likeComment } = useLikeCommentMutation()

  const comments = data?.comments || []

  const handleEditClick = (comment: Comment) => {
    setSelectedComment(comment)
    setShowEditDialog(true)
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={() => setShowAddDialog(true)}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-center justify-between text-sm border-b pb-1"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">
                {comment.user.username}:
              </span>
              <span className="truncate">
                {highlightText(comment.body, searchQuery)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  likeComment({
                    id: comment.id,
                    postId,
                    currentLikes: comment.likes,
                  })
                }
              >
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditClick(comment)}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteComment({ id: comment.id, postId })}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AddCommentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        postId={postId}
      />

      <EditCommentDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        comment={selectedComment}
      />
    </div>
  )
}

