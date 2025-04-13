'use client'

import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type ScanResult = {
  title: string
  description: string
  iconUrl: string
  score: number
  breakdown: string[]
}

export default function GameScanner() {
  const [gameUrl, setGameUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState('')

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setError('')

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        body: JSON.stringify({ gameUrl }),
      })

      const text = await res.text()
      const data = text ? JSON.parse(text) : null

      if (!res.ok || !data) {
        setError(data?.error || 'Something went wrong.')
        setLoading(false)
        return
      }

      // 🔍 Analyse icon client-side
      const iconResult = await analyseIcon(data.iconUrl)

      // ✅ Merge scores
      const finalScore = data.score + iconResult.points
      const fullBreakdown = [...data.breakdown, ...iconResult.response]

      setResult({ ...data, score: finalScore, breakdown: fullBreakdown })
    } catch {
      setError('Failed to fetch or parse game data.')
    }

    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Boost Report</h2>

      <form onSubmit={handleScan} className="flex flex-col gap-4 mb-6">
        <input
          type="url"
          value={gameUrl}
          onChange={(e) => setGameUrl(e.target.value)}
          placeholder="Paste your Roblox game link"
          required
          className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
        <Button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Scanning...' : 'Generate Boost Report'}
        </Button>
      </form>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{result ? result.title : ""}</CardTitle>
        </CardHeader>
        <CardContent>
          {result && result.iconUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.iconUrl}
                alt="Game Icon"
                className="w-16 h-16 rounded-md border center"
              />
          )}

          <p className="text-sm text-gray-500 mb-4">
            Launch Score: <strong>{result ? result.score : "N/A"}%</strong>
          </p>

          <ul className="list-disc ml-4 text-sm text-left">
            {result ? result.breakdown.map((item, i) => (
              <li key={i}>{item}</li>
            )) : "Error!"}
          </ul>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Boost Report</h2>

      <form onSubmit={handleScan} className="flex flex-col gap-4 mb-6">
        <input
          type="url"
          value={gameUrl}
          onChange={(e) => setGameUrl(e.target.value)}
          placeholder="Paste your Roblox game link"
          required
          className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Scanning...' : 'Generate Boost Report'}
        </button>
      </form>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {result && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            {result.iconUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.iconUrl}
                alt="Game Icon"
                className="w-16 h-16 rounded-md border"
              />
            )}
            <div>
              <h3 className="text-xl font-bold">{result.title}</h3>
              <p className="text-sm text-gray-500">{result.description?.slice(0, 100)}...</p>
            </div>
          </div>

          <p className="text-lg font-semibold mb-2">
            Launch Readiness Score: <span className="text-blue-600">{result.score}/100</span>
          </p>

          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {result.breakdown.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// 🧠 Client-side image analysis
async function analyseIcon(iconUrl: string): Promise<{ points: number; response: string[] }> {
  let points = 0
  const response: string[] = []

  if (!iconUrl) {
    response.push("⚠️ No icon found.")
    return { points, response }
  }

  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = iconUrl

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      // Resolution
      if (img.width >= 512 && img.height >= 512) {
        points += 10
        response.push(`✅ High-res icon: ${img.width}x${img.height}`)
      } else {
        response.push(`⚠️ Low-res icon: ${img.width}x${img.height}`)
      }

      // Average color
      const data = ctx.getImageData(0, 0, img.width, img.height).data
      let r = 0, g = 0, b = 0
      const count = img.width * img.height

      for (let i = 0; i < data.length; i += 4) {
        r += data[i]
        g += data[i + 1]
        b += data[i + 2]
      }

      r /= count
      g /= count
      b /= count

      const color = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
      response.push(`🎨 Dominant color: ${color}`)

      if (r > g && r > b) {
        points += 2
        response.push("🧠 Red-based: action-oriented")
      } else if (g > r && g > b) {
        points += 2
        response.push("🧠 Green-based: calm or money-focused")
      } else if (b > r && b > g) {
        points += 2
        response.push("🧠 Blue-based: clean or techy")
      } else {
        response.push("🧠 Balanced color palette")
      }

      resolve({ points, response })
    }

    img.onerror = () => {
      response.push("❌ Could not load icon for analysis.")
      resolve({ points, response })
    }
  })
}