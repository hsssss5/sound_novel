const STORAGE_KEY = 'sn-unique-visitor'
const COUNTER_KEY = 'hsssss5-sound-novel-unique-visitors'
const API_BASE = `https://countapi.mileshilliard.com/api/v1`

type CounterResponse = {
  key?: string
  value?: string | number
  message?: string
  error?: string
}

async function readCounterResponse(response: Response) {
  const data = (await response.json()) as CounterResponse
  if (!response.ok || data.error != null) {
    throw new Error(data.error || `Counter HTTP ${response.status}`)
  }
  const value = Number(data.value)
  if (!Number.isFinite(value)) {
    throw new Error('Counter returned invalid value')
  }
  return value
}

export async function trackUniqueVisitor() {
  if (typeof window === 'undefined') {
    return
  }
  try {
    if (localStorage.getItem(STORAGE_KEY)) {
      return
    }
    localStorage.setItem(STORAGE_KEY, '1')
    await fetch(`${API_BASE}/hit/${COUNTER_KEY}`)
  } catch {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }
}

export async function getUniqueVisitorCount() {
  const response = await fetch(`${API_BASE}/get/${COUNTER_KEY}`)
  if (response.status === 404) {
    return 0
  }
  return readCounterResponse(response)
}
