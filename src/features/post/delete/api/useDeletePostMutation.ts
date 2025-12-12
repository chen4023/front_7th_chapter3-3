import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postApi, postKeys, Post } from "@/entities/post"

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postApi.deletePost,
    onMutate: async (deletedId) => {
      // 낙관적 업데이트를 위해 현재 데이터 스냅샷 저장
      await queryClient.cancelQueries({ queryKey: postKeys.lists() })

      const previousData = queryClient.getQueriesData<{
        posts: Post[]
        total: number
      }>({ queryKey: postKeys.lists() })

      // 낙관적으로 UI 업데이트
      queryClient.setQueriesData<{ posts: Post[]; total: number }>(
        { queryKey: postKeys.lists() },
        (old) => {
          if (!old) return old
          return {
            ...old,
            posts: old.posts.filter((post) => post.id !== deletedId),
            total: old.total - 1,
          }
        },
      )

      return { previousData }
    },
    onError: (_err, _deletedId, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      context?.previousData?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },
  })
}

