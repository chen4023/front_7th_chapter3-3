import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui"
import { useTagsQuery } from "@/entities/tag"
import { useFilterStore } from "../model/store"
import { useSearchStore } from "../../search/model/store"
import { usePaginationStore } from "../../pagination/model/store"

export const TagFilter = () => {
  const { selectedTag, setSelectedTag } = useFilterStore()
  const { resetSearch } = useSearchStore()
  const { resetPagination } = usePaginationStore()
  const { data: tags = [] } = useTagsQuery()

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    resetSearch()
    resetPagination()
  }

  return (
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
  )
}
