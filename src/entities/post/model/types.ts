import { User } from "@/entities/user"

// Domain Model (UI에서 사용하는 타입)
export interface Post {
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
  author?: User
}

export interface PostsData {
  posts: Post[]
  total: number
  skip: number
  limit: number
}
