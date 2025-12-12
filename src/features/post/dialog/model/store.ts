import { create } from "zustand"
import { Post } from "@/entities/post"

interface PostDialogState {
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
  selectedPost: Post | null

  openAddDialog: () => void
  closeAddDialog: () => void
  openEditDialog: (post: Post) => void
  closeEditDialog: () => void
  openPostDetailDialog: (post: Post) => void
  closePostDetailDialog: () => void
}

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

