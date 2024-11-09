import { NextRequest, NextResponse } from 'next/server'
import fetch from 'node-fetch'

const allowedDomains: string[] = []

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
    }

    const response = await fetch(url)

    if (!response.ok) {
      return NextResponse.json({ error: 'Error fetching the provided URL' }, { status: 400 })
    }

    const data = await response.text()

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
