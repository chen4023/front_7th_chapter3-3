import { apiClient } from "@/shared/api"
import { TagDto } from "../model/dto"

export const tagApi = {
  getTags: async () => {
    const { data } = await apiClient.get<TagDto[]>("/posts/tags")
    return data
  },
}
