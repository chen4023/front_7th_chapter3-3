import { useMemo } from "react"
import {
  usePostsQuery,
  usePostsByTagQuery,
  useSearchPostsQuery,
} from "@/entities/post"
import { useSearchStore } from "@/features/post/search/model/store"
import { useFilterStore } from "@/features/post/filter/model/store"
import { usePaginationStore } from "@/features/post/pagination/model/store"

export const usePostsData = () => {
  // Zustand Stores
  const { activeSearch } = useSearchStore()
  const { selectedTag, sortBy, sortOrder } = useFilterStore()
  const { skip, limit } = usePaginationStore()

  // Queries
  const { data: postsData, isLoading: isPostsLoading } = usePostsQuery({
    limit,
    skip,
  })

  const { data: tagPostsData, isLoading: isTagPostsLoading } =
    usePostsByTagQuery(selectedTag)

  const { data: searchData, isLoading: isSearchLoading } =
    useSearchPostsQuery(activeSearch)

  // 현재 표시할 데이터 결정
  const currentData = activeSearch
    ? searchData
    : selectedTag && selectedTag !== "all"
      ? tagPostsData
      : postsData

  const rawPosts = currentData?.posts || []
  const total = currentData?.total || 0
  const isLoading = isPostsLoading || isTagPostsLoading || isSearchLoading

  // 정렬 적용
  const posts = useMemo(() => {
    if (!sortBy || sortBy === "none") return rawPosts

    return [...rawPosts].sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "id":
          comparison = a.id - b.id
          break
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
        case "reactions":
          comparison = (a.reactions?.likes || 0) - (b.reactions?.likes || 0)
          break
        default:
          return 0
      }

      return sortOrder === "desc" ? -comparison : comparison
    })
  }, [rawPosts, sortBy, sortOrder])

  return {
    posts,
    total,
    isLoading,
  }
}

