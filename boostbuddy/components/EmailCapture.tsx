'use client'

import { useState } from 'react'

export default function EmailCapture() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    console.log("Client env URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')

        const res = await fetch('/api/subscribe', {
            method: 'POST',
            body: JSON.stringify({ email }),
        })

        const data = await res.json()

        if (res.ok) {
            setStatus('success')
            setEmail('')
        } else {
            setStatus('error')
            setErrorMessage(data.error || 'Something went wrong. Please try again')
        }
    }

    return (
        <form onSubmit={handleSubmit} className = "max-w-md mx-auto mt-8">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
            >
                {status === 'loading' ? 'Submitting...' : 'Join Waitlist'}
            </button>

            {status === 'success' && <p className="text-green-600 mt-2">You are on the list!</p>}
            {status === 'error' && <p className="text-red-600 mt-2">{errorMessage}</p>}
        </form>
    )
}