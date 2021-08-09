import { stringifyUrl, parse } from 'query-string'

/*
 * API 설명 https://developers.google.com/books/docs/v1/reference/volumes/list
 * https://www.googleapis.com/books/v1/volumes?q=검색어
 * stringifyUrl = obj to string URL
 */

// utils.js
async function requestGet(url) {
  const response = await fetch(url);
  return response;
 }

////////////////////
export async function getBooks2(search, startIndex) {
  const url = makeURL(search, startIndex)
  const response = requestGet(url);
  const data = await response.json()
  // throw Error('error')
  return data
}
////////////////////

const makeURL = (search, startIndex) => {
  const { q, ...rest } = parse(search)
  const url = stringifyUrl({
    url: 'https://www.googleapis.com/books/v1/volumes', //상수처리
    query: {
      q: `${q}`,
      startIndex, //pagination 요청 10,20,30,...
      projection: 'full',
      ...rest
    }
  })
  return url
}

export async function getBooks(search, startIndex) {
  const url = makeURL(search, startIndex)
  const response = await fetch(url)
  const data = await response.json()
  // throw Error('error')
  return data
}
