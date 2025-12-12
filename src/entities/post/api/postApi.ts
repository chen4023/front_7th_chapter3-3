import { apiClient } from "@/shared/api"
import {
  PostDto,
  PostsResponseDto,
  GetPostsParams,
  CreatePostDto,
  UpdatePostDto,
} from "../model/dto"

export const postApi = {
  getPosts: async (params: GetPostsParams) => {
    const { data } = await apiClient.get<PostsResponseDto>("/posts", { params })
    return data
  },

  getPostsByTag: async (tag: string) => {
    const { data } = await apiClient.get<PostsResponseDto>(`/posts/tag/${tag}`)
    return data
  },

  searchPosts: async (query: string) => {
    const { data } = await apiClient.get<PostsResponseDto>("/posts/search", {
      params: { q: query },
    })
    return data
  },

  addPost: async (post: CreatePostDto) => {
    const { data } = await apiClient.post<PostDto>("/posts/add", post)
    return data
  },

  updatePost: async (id: number, post: UpdatePostDto) => {
    const { data } = await apiClient.put<PostDto>(`/posts/${id}`, post)
    return data
  },

  deletePost: async (id: number) => {
    await apiClient.delete(`/posts/${id}`)
    return id
  },
}
