import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentApi, commentKeys, Comment } from "@/entities/comment"

interface UpdateCommentParams {
  id: number
  body: string
  postId: number
}

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: UpdateCommentParams) =>
      commentApi.updateComment(id, { body }),
    onSuccess: (updatedComment, variables) => {
      queryClient.setQueryData<{ comments: Comment[] }>(
        commentKeys.byPost(variables.postId),
        (old) => {
          if (!old) return old
          return {
            ...old,
            comments: old.comments.map((comment) =>
              comment.id === updatedComment.id
                ? (updatedComment as Comment)
                : comment,
            ),
          }
        },
      )
    },
  })
}
