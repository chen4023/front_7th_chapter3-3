import { create } from "zustand"

interface FilterState {
  selectedTag: string
  sortBy: string
  sortOrder: string

  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: string) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedTag: "",
  sortBy: "",
  sortOrder: "asc",

  setSelectedTag: (selectedTag) => set({ selectedTag }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  resetFilters: () => set({ selectedTag: "", sortBy: "", sortOrder: "asc" }),
}))

