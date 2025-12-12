import { create } from "zustand"

interface PaginationState {
  skip: number
  limit: number

  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  nextPage: (total: number) => void
  prevPage: () => void
  resetPagination: () => void
}

export const usePaginationStore = create<PaginationState>((set, get) => ({
  skip: 0,
  limit: 10,

  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit, skip: 0 }),
  nextPage: (total) => {
    const { skip, limit } = get()
    if (skip + limit < total) {
      set({ skip: skip + limit })
    }
  },
  prevPage: () => {
    const { skip, limit } = get()
    set({ skip: Math.max(0, skip - limit) })
  },
  resetPagination: () => set({ skip: 0, limit: 10 }),
}))

