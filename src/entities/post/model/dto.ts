// Request DTOs
export interface GetPostsParams {
  limit: number
  skip: number
}

export interface CreatePostDto {
  title: string
  body: string
  userId: number
}

export interface UpdatePostDto {
  title?: string
  body?: string
}

// Response DTOs
export interface PostDto {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

export interface PostsResponseDto {
  posts: PostDto[]
  total: number
  skip: number
  limit: number
}

