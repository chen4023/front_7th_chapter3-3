import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Plus, Search } from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui"
import { Post, usePostsQuery, usePostsByTagQuery, useSearchPostsQuery } from "@/entities/post"
import { useTagsQuery } from "@/entities/tag"
import { AddPostDialog, EditPostDialog } from "@/features/post"
import { PostsTable } from "@/widgets/posts-table"
import { PostDetailDialog } from "@/widgets/post-detail-dialog"
import { UserModal } from "@/widgets/user-modal"

const PostsManagerPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // URL 상태
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")

  // UI 상태
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  // 검색 실행 상태
  const [activeSearch, setActiveSearch] = useState(queryParams.get("search") || "")

  // Queries
  const { data: tagsData } = useTagsQuery()
  const tags = tagsData || []

  const { data: postsData, isLoading: isPostsLoading } = usePostsQuery(
    { limit, skip },
    // selectedTag이 있으면 비활성화
  )

  const { data: tagPostsData, isLoading: isTagPostsLoading } = usePostsByTagQuery(selectedTag)

  const { data: searchData, isLoading: isSearchLoading } = useSearchPostsQuery(activeSearch)

  // 현재 표시할 데이터 결정
  const currentData = activeSearch
    ? searchData
    : selectedTag && selectedTag !== "all"
      ? tagPostsData
      : postsData

  const posts = currentData?.posts || []
  const total = currentData?.total || 0
  const isLoading = isPostsLoading || isTagPostsLoading || isSearchLoading

  // URL 업데이트
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (activeSearch) params.set("search", activeSearch)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 검색 실행
  const handleSearch = () => {
    setActiveSearch(searchQuery)
    setSkip(0)
    updateURL()
  }

  // 태그 선택
  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    setActiveSearch("")
    setSearchQuery("")
    setSkip(0)
  }

  // 게시물 상세
  const handlePostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  // 게시물 수정
  const handleEditPost = (post: Post) => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  // 사용자 클릭
  const handleUserClick = (author: Post["author"]) => {
    if (author) {
      setSelectedUserId(author.id)
      setShowUserModal(true)
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>
            <Select value={selectedTag} onValueChange={handleTagChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {isLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostsTable
              posts={posts}
              searchQuery={activeSearch}
              selectedTag={selectedTag}
              onTagClick={handleTagChange}
              onPostDetail={handlePostDetail}
              onEditPost={handleEditPost}
              onUserClick={handleUserClick}
            />
          )}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select
                value={limit.toString()}
                onValueChange={(value) => setLimit(Number(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button
                disabled={skip === 0}
                onClick={() => setSkip(Math.max(0, skip - limit))}
              >
                이전
              </Button>
              <Button
                disabled={skip + limit >= total}
                onClick={() => setSkip(skip + limit)}
              >
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 다이얼로그들 */}
      <AddPostDialog open={showAddDialog} onOpenChange={setShowAddDialog} />

      <EditPostDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        post={selectedPost}
      />

      <PostDetailDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        post={selectedPost}
        searchQuery={activeSearch}
      />

      <UserModal
        open={showUserModal}
        onOpenChange={setShowUserModal}
        userId={selectedUserId}
      />
    </Card>
  )
}

export default PostsManagerPage

