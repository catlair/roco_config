import useSWR from 'swr'

const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json())

export function useFetch<Data = any, Error = any>(url: string) {
  return useSWR<Data, Error>(url, fetcher)
}
