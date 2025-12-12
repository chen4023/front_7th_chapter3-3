import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentApi, commentKeys, Comment } from "@/entities/comment"

export const useLikeCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      currentLikes,
    }: {
      id: number
      postId: number
      currentLikes: number
    }) => commentApi.likeComment(id, currentLikes),
    onMutate: async ({ id, postId, currentLikes }) => {
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
            comments: old.comments.map((comment) =>
              comment.id === id
                ? { ...comment, likes: currentLikes + 1 }
                : comment,
            ),
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

