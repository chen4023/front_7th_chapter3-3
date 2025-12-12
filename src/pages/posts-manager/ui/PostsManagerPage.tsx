import { Plus } from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui"
import { usePostsQuery, usePostsByTagQuery, useSearchPostsQuery } from "@/entities/post"
import {
  SearchInput,
  TagFilter,
  SortFilter,
  Pagination,
  AddPostDialog,
  EditPostDialog,
  useSearchStore,
  useFilterStore,
  usePaginationStore,
  usePostDialogStore,
} from "@/features/post"
import { PostsTable } from "@/widgets/posts-table"
import { PostDetailDialog } from "@/widgets/post-detail-dialog"
import { UserModal } from "@/widgets/user-modal"

const PostsManagerPage = () => {
  // Zustand Stores
  const { activeSearch } = useSearchStore()
  const { selectedTag } = useFilterStore()
  const { skip, limit } = usePaginationStore()
  const { openAddDialog } = usePostDialogStore()

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

  const posts = currentData?.posts || []
  const total = currentData?.total || 0
  const isLoading = isPostsLoading || isTagPostsLoading || isSearchLoading

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={openAddDialog}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <SearchInput />
            <TagFilter />
            <SortFilter />
          </div>

          {/* 게시물 테이블 */}
          {isLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostsTable posts={posts} />
          )}

          {/* 페이지네이션 */}
          <Pagination total={total} />
        </div>
      </CardContent>

      {/* 다이얼로그들 - Store로 관리 */}
      <AddPostDialog />
      <EditPostDialog />
      <PostDetailDialog />
      <UserModal />
    </Card>
  )
}

export default PostsManagerPage
