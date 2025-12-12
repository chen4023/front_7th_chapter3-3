import { useQuery } from "@tanstack/react-query"
import { tagApi } from "./tagApi"
import { tagKeys } from "../model/keys"

export const useTagsQuery = () => {
  return useQuery({
    queryKey: tagKeys.all,
    queryFn: tagApi.getTags,
  })
}

