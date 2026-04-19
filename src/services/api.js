const BASE_URL = '/bb-api'

async function apiFetch(endpoint, params = {}) {
  const query = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')

  const url = `${BASE_URL}${endpoint}${query ? `?${query}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }

  const json = await response.json()

  if (!json.success) {
    throw new Error(json.message || 'API returned an error')
  }

  return json
}

function extractData(json) {
  const data = Array.isArray(json.data) ? json.data : []
  return { data, count: data.length }
}

export async function getCharacters(params = {}) {
  const json = await apiFetch('/characters', params)
  return extractData(json)
}

export async function getAllCharacters(params = {}) {
  const json = await apiFetch('/characters', { ...params, limit: 500 })
  return extractData(json)
}

export async function getCharacterById(id) {
  const json = await apiFetch(`/characters/${id}`)
  return Array.isArray(json.data) ? json.data[0] : json.data
}

export async function getEpisodes(params = {}) {
  const json = await apiFetch('/episodes', params)
  return extractData(json)
}

export async function getEpisodeById(id) {
  const json = await apiFetch(`/episodes/${id}`)
  return Array.isArray(json.data) ? json.data[0] : json.data
}

export async function getQuotes(params = {}) {
  const json = await apiFetch('/quotes', params)
  return extractData(json)
}

export async function getDeaths(params = {}) {
  const json = await apiFetch('/deaths', params)
  return extractData(json)
}
