import EmailCapture from '../components/EmailCapture'

export default function HomePage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-4">BoostBuddy</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Boost your Roblox game to the front page. Join the waitlist to get early access.
        </p>
        <EmailCapture />
      </main>
    )
}