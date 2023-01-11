import {
  QueryFunction,
  QueryKey,
  useQuery as useQueryWrapper,
  UseQueryOptions,
} from "@tanstack/react-query"

interface QueryArg extends UseQueryOptions {
  key: QueryKey
  fetchAction: QueryFunction
  select?: (data: any) => any
}

export default function useQuery({ key, fetchAction, ...options }: QueryArg) {
  return useQueryWrapper(key, fetchAction, {
    enabled: true,
    ...options,
  })
}
