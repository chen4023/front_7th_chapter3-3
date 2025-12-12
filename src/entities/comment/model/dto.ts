// Request DTOs
export interface CreateCommentDto {
  body: string
  postId: number
  userId: number
}

export interface UpdateCommentDto {
  body: string
}

export interface LikeCommentDto {
  likes: number
}

// Response DTOs
export interface CommentDto {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
}

export interface CommentsResponseDto {
  comments: CommentDto[]
  total: number
  skip: number
  limit: number
}

