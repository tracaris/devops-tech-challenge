import { useEffect, useState } from 'react'
import API_URL from './config'

function App() {
  const [id, setId] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await fetch(API_URL)
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const data = await resp.json()
        setId(data.id)
      } catch (e) {
        setError(e.message || 'Failed to load')
      }
    }
    load()
  }, [])

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <h1>ERROR</h1>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>SUCCESS</h1>
      <p>{id || 'Loading...'}</p>
    </div>
  )
}

export default App

