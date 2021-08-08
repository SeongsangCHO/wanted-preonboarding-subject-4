import { stringifyUrl, parse } from 'query-string'

/*
* API 설명 https://developers.google.com/books/docs/v1/reference/volumes/get
* https://www.googleapis.com/books/v1/volumes?q=검색어
* stringifyUrl = obj to string URL
*/
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
