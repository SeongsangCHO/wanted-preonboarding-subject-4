import { stringifyUrl, parse } from 'query-string'

export async function getBooks(search, startIndex) {
  const { q, ...rest } = parse(search)
  const input = stringifyUrl({
    url: 'https://www.googleapis.com/books/v1/volumes',
    query: {
      q: `${q}`,
      startIndex,
      projection: 'full',
      ...rest
    }
  })

  return fetch(input)
}
