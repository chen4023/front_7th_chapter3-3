import { useQuery } from "@tanstack/react-query"
import { userApi } from "./userApi"
import { userKeys } from "../model/keys"

export const useUsersQuery = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: userApi.getUsers,
  })
}

export const useUserQuery = (id: number | null) => {
  return useQuery({
    queryKey: userKeys.detail(id!),
    queryFn: () => userApi.getUserById(id!),
    enabled: id !== null,
  })
}

