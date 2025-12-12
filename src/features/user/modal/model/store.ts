import { create } from "zustand"

interface UserModalState {
  showUserModal: boolean
  selectedUserId: number | null

  openUserModal: (userId: number) => void
  closeUserModal: () => void
}

export const useUserModalStore = create<UserModalState>((set) => ({
  showUserModal: false,
  selectedUserId: null,

  openUserModal: (userId) =>
    set({ showUserModal: true, selectedUserId: userId }),
  closeUserModal: () => set({ showUserModal: false, selectedUserId: null }),
}))

