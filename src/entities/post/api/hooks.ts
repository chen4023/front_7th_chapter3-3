import { useQuery } from "@tanstack/react-query"
import { postApi } from "./postApi"
import { userApi } from "@/entities/user/api/userApi"
import { postKeys } from "../model/keys"
import { Post } from "../model/types"
import { GetPostsParams } from "../model/dto"

export const usePostsQuery = (params: GetPostsParams) => {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: async () => {
      const [postsData, usersData] = await Promise.all([
        postApi.getPosts(params),
        userApi.getUsers(),
      ])

      const postsWithUsers: Post[] = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      return {
        ...postsData,
        posts: postsWithUsers,
      }
    },
  })
}

export const usePostsByTagQuery = (tag: string) => {
  return useQuery({
    queryKey: postKeys.byTag(tag),
    queryFn: async () => {
      const [postsData, usersData] = await Promise.all([
        postApi.getPostsByTag(tag),
        userApi.getUsers(),
      ])

      const postsWithUsers: Post[] = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      return {
        ...postsData,
        posts: postsWithUsers,
      }
    },
    enabled: !!tag && tag !== "all",
  })
}

export const useSearchPostsQuery = (query: string) => {
  return useQuery({
    queryKey: postKeys.search(query),
    queryFn: () => postApi.searchPosts(query),
    enabled: !!query,
  })
}

