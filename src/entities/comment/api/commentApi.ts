import { apiClient } from "@/shared/api"
import {
  CommentDto,
  CommentsResponseDto,
  CreateCommentDto,
  UpdateCommentDto,
} from "../model/dto"

export const commentApi = {
  getCommentsByPostId: async (postId: number) => {
    const { data } = await apiClient.get<CommentsResponseDto>(
      `/comments/post/${postId}`,
    )
    return data
  },

  addComment: async (comment: CreateCommentDto) => {
    const { data } = await apiClient.post<CommentDto>("/comments/add", comment)
    return data
  },

  updateComment: async (id: number, dto: UpdateCommentDto) => {
    const { data } = await apiClient.put<CommentDto>(`/comments/${id}`, dto)
    return data
  },

  deleteComment: async (id: number) => {
    await apiClient.delete(`/comments/${id}`)
    return id
  },

  likeComment: async (id: number, currentLikes: number) => {
    const { data } = await apiClient.patch<CommentDto>(`/comments/${id}`, {
      likes: currentLikes + 1,
    })
    return data
  },
}
