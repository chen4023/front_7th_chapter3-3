export const commentKeys = {
  all: ["comments"] as const,
  byPost: (postId: number) => [...commentKeys.all, "post", postId] as const,
}

