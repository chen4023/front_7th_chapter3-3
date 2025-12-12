import { create } from "zustand"

interface SearchState {
  searchQuery: string
  activeSearch: string

  setSearchQuery: (query: string) => void
  executeSearch: () => void
  resetSearch: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: "",
  activeSearch: "",

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  executeSearch: () => set((state) => ({ activeSearch: state.searchQuery })),
  resetSearch: () => set({ searchQuery: "", activeSearch: "" }),
}))

