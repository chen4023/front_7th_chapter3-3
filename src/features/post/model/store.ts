import { create } from "zustand"
import { Post } from "@/entities/post"

interface PostsFilterState {
  // 필터/검색 상태
  skip: number
  limit: number
  searchQuery: string
  activeSearch: string
  selectedTag: string
  sortBy: string
  sortOrder: string

  // Actions
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSearchQuery: (query: string) => void
  executeSearch: () => void
  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: string) => void
  resetFilters: () => void
}

interface PostDialogState {
  // 다이얼로그 상태
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
  selectedPost: Post | null

  // Actions
  openAddDialog: () => void
  closeAddDialog: () => void
  openEditDialog: (post: Post) => void
  closeEditDialog: () => void
  openPostDetailDialog: (post: Post) => void
  closePostDetailDialog: () => void
}

interface UserModalState {
  showUserModal: boolean
  selectedUserId: number | null

  openUserModal: (userId: number) => void
  closeUserModal: () => void
}

// 필터/검색 Store
export const usePostsFilterStore = create<PostsFilterState>((set) => ({
  skip: 0,
  limit: 10,
  searchQuery: "",
  activeSearch: "",
  selectedTag: "",
  sortBy: "",
  sortOrder: "asc",

  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit, skip: 0 }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  executeSearch: () =>
    set((state) => ({ activeSearch: state.searchQuery, skip: 0 })),
  setSelectedTag: (selectedTag) =>
    set({ selectedTag, activeSearch: "", searchQuery: "", skip: 0 }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  resetFilters: () =>
    set({
      skip: 0,
      limit: 10,
      searchQuery: "",
      activeSearch: "",
      selectedTag: "",
      sortBy: "",
      sortOrder: "asc",
    }),
}))

// 다이얼로그 Store
export const usePostDialogStore = create<PostDialogState>((set) => ({
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
  selectedPost: null,

  openAddDialog: () => set({ showAddDialog: true }),
  closeAddDialog: () => set({ showAddDialog: false }),
  openEditDialog: (post) => set({ showEditDialog: true, selectedPost: post }),
  closeEditDialog: () => set({ showEditDialog: false, selectedPost: null }),
  openPostDetailDialog: (post) =>
    set({ showPostDetailDialog: true, selectedPost: post }),
  closePostDetailDialog: () =>
    set({ showPostDetailDialog: false, selectedPost: null }),
}))

// 사용자 모달 Store
export const useUserModalStore = create<UserModalState>((set) => ({
  showUserModal: false,
  selectedUserId: null,

  openUserModal: (userId) => set({ showUserModal: true, selectedUserId: userId }),
  closeUserModal: () => set({ showUserModal: false, selectedUserId: null }),
}))

