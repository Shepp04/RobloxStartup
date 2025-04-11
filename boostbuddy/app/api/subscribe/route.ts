import { supabase } from '../../../lib/supabaseClient'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = body?.email

    console.log('Incoming email:', email)

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const { error } = await supabase.from('subscribers').insert([{ email }])

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 })
      }
      
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Subscribed!' }, { status: 200 })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Unexpected error in /api/subscribe:', err.message)
    } else {
      console.error('Unexpected non-Error value in catch block:', err)
    }
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}