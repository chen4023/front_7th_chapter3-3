import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postApi, postKeys, Post, UpdatePostDto } from "@/entities/post"

interface UpdatePostParams extends UpdatePostDto {
  id: number
}

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...post }: UpdatePostParams) =>
      postApi.updatePost(id, post),
    onSuccess: (updatedPost) => {
      // 낙관적 업데이트
      queryClient.setQueriesData<{ posts: Post[]; total: number }>(
        { queryKey: postKeys.lists() },
        (old) => {
          if (!old) return old
          return {
            ...old,
            posts: old.posts.map((post) =>
              post.id === updatedPost.id ? { ...post, ...updatedPost } : post,
            ),
          }
        },
      )
    },
  })
}
