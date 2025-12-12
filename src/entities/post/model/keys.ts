export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (params: { limit: number; skip: number }) =>
    [...postKeys.lists(), params] as const,
  byTag: (tag: string) => [...postKeys.all, "tag", tag] as const,
  search: (query: string) => [...postKeys.all, "search", query] as const,
}

