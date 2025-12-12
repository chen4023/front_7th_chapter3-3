import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postApi, postKeys, Post } from "@/entities/post"

export const useAddPostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postApi.addPost,
    onSuccess: (newPost) => {
      // 낙관적 업데이트: 모든 posts 쿼리에 새 게시물 추가
      queryClient.setQueriesData<{ posts: Post[]; total: number }>(
        { queryKey: postKeys.lists() },
        (old) => {
          if (!old) return old
          return {
            ...old,
            posts: [newPost as Post, ...old.posts],
            total: old.total + 1,
          }
        },
      )
    },
  })
}
