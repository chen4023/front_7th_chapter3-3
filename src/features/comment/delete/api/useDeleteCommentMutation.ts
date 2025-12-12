import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentApi, commentKeys, Comment } from "@/entities/comment"

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number; postId: number }) =>
      commentApi.deleteComment(id),
    onMutate: async ({ id, postId }) => {
      await queryClient.cancelQueries({ queryKey: commentKeys.byPost(postId) })

      const previousComments = queryClient.getQueryData<{ comments: Comment[] }>(
        commentKeys.byPost(postId),
      )

      // 낙관적 업데이트
      queryClient.setQueryData<{ comments: Comment[] }>(
        commentKeys.byPost(postId),
        (old) => {
          if (!old) return old
          return {
            ...old,
            comments: old.comments.filter((comment) => comment.id !== id),
          }
        },
      )

      return { previousComments, postId }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousComments && context?.postId) {
        queryClient.setQueryData(
          commentKeys.byPost(context.postId),
          context.previousComments,
        )
      }
    },
  })
}

