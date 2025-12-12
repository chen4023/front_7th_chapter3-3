import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentApi, commentKeys, Comment, CreateCommentDto } from "@/entities/comment"

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (comment: CreateCommentDto) => commentApi.addComment(comment),
    onSuccess: (newComment) => {
      // 해당 게시물의 댓글 목록에 추가
      queryClient.setQueryData<{ comments: Comment[] }>(
        commentKeys.byPost(newComment.postId),
        (old) => {
          if (!old) return { comments: [newComment as Comment] }
          return {
            ...old,
            comments: [...old.comments, newComment as Comment],
          }
        },
      )
    },
  })
}
