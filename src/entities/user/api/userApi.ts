import { apiClient } from "@/shared/api"
import { UserDto, UsersResponseDto } from "../model/dto"

export const userApi = {
  getUsers: async () => {
    const { data } = await apiClient.get<UsersResponseDto>("/users", {
      params: { limit: 0, select: "username,image" },
    })
    return data
  },

  getUserById: async (id: number) => {
    const { data } = await apiClient.get<UserDto>(`/users/${id}`)
    return data
  },
}
