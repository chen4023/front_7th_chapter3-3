import { Search } from "lucide-react"
import { Input } from "@/shared/ui"
import { usePostsFilterStore } from "../../model/store"

export const SearchInput = () => {
  const { searchQuery, setSearchQuery, executeSearch } = usePostsFilterStore()

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && executeSearch()}
        />
      </div>
    </div>
  )
}

