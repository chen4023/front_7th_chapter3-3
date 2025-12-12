import { useQuery } from "@tanstack/react-query"
import { commentApi } from "./commentApi"
import { commentKeys } from "../model/keys"

export const useCommentsQuery = (postId: number | null) => {
  return useQuery({
    queryKey: commentKeys.byPost(postId!),
    queryFn: () => commentApi.getCommentsByPostId(postId!),
    enabled: postId !== null,
  })
}

