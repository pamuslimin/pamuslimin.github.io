const queryLocation = new URLSearchParams(window.location.search)

export function getParameters(key: string, defaultValue = ""): string {
  return new URLSearchParams(window.location.search).get(key) || defaultValue
}

export function parametersToObject(parameters: string): { [k: string]: string } {
  return Object.fromEntries(new URLSearchParams(parameters))
}

export function objectToParameters(payload: Record<string, unknown> | string, prefix = ""): string {
  let result: any = payload
  if (typeof payload === "string") {
    result = parametersToObject(payload.toString())
  }
  const resultValue = Object.entries(result).reduce(
    (a: Record<string, any>, [k, v]): Record<string, any> => (v ? ((a[k] = v), a) : a),
    {},
  )
  const query: any = Object.keys(resultValue).map((key) => {
    const value = result[key]
    if (result.constructor === Array) {
      key = `${prefix}[]`
    } else if (result.constructor === Object) {
      key = prefix ? `${prefix}[${key}]` : key
    }
    if (typeof value === "object") {
      return objectToParameters(value, key)
    }

    return `${key}=${encodeURIComponent(value.toString())}`
  })

  // eslint-disable-next-line prefer-spread
  return [].concat
    .apply([], query)
    .filter((e) => e)
    .join("&")
}

export function setParameters(key: string, value: string): string {
  queryLocation.set(key, value)
  return queryLocation.toString()
}

export function deleteParameters(key: string): string {
  queryLocation.delete(key)
  return queryLocation.toString()
}

export function stateToKodesiana(state: Record<string, any>) {
  const sort = state.sorting?.[0]
  const sort_by = sort?.id
  const sort_order = sort?.desc ? "Descending" : "Ascending"
  const query: Record<string, any> = {
    page: state.pagination?.pageIndex + 1 || 1,
    page_size: state.pagination?.pageSize || 10,
  }

  if (sort_by && sort_by !== "") {
    query.sort_by = sort_by
    query.sort_order = sort_order
  }
  return query
}
