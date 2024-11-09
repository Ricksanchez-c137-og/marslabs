'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [url, setUrl] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/submit-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await res.json()
      if (res.ok) {
        setResponse(data.data) // Display the fetched content from the URL
      } else {
        setResponse(`Error: ${data.error}`)
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`)
    }

    // Reset the input field after submission
    setUrl('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Marslabs</h1>
      </header>
      <main className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Submit the CV URL</h2>
          <div className="space-y-4">
            <Input
              type="url"
              placeholder="Enter a URL to fetch"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full"
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
        {response && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold">Response:</h3>
            <pre className="whitespace-pre-wrap text-gray-800">{response}</pre>
          </div>
        )}
      </main>
    </div>
  )
}
