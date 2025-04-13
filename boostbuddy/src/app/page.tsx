import EmailCapture from '@/components/email/EmailCapture'
import GameScanner from '@/components/scan/GameScanner'
import FeatureCard from '@/components/info/FeatureCard'
import Step from '@/components/info/Step'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-4 sm:px-6 lg:px-8">
      <section className="max-w-4xl mx-auto py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
          Boost your Roblox game to the front page.
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          BoostBuddy analyses your game and gives you a personalized plan to grow faster, earn more Robux, and keep players coming back.
        </p>
        <EmailCapture />
        <p className="text-sm text-gray-400 mt-4">Join 100+ Roblox devs on the early access waitlist</p>
      </section>

      <section className="max-w-4xl mx-auto py-20 text-center">
        <GameScanner />
      </section>

      <section className="max-w-4xl mx-auto py-12 grid sm:grid-cols-2 gap-8">
        <FeatureCard title="🚀 Launch Readiness Score" desc="Get a score out of 100 and a checklist to improve your game’s performance." />
        <FeatureCard title="🎯 Competitor Benchmarking" desc="See how your game compares to front-page hits in your genre." />
        <FeatureCard title="📸 Icon & Thumbnail Analysis" desc="Boost click-throughs with visual feedback on your game’s first impression." />
        <FeatureCard title="💰 Monetization Insights" desc="Uncover missed revenue opportunities with smart pricing and timing tips." />
      </section>

      <section className="max-w-4xl mx-auto py-20 text-center border-t border-gray-100 mt-12">
        <h2 className="text-3xl font-bold mb-6">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <Step number="1" title="Paste your game link" />
          <Step number="2" title="Get your Boost Report" />
          <Step number="3" title="Follow the plan to grow" />
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-gray-400 border-t border-gray-100">
        Built with ❤️ by Roblox devs • © BoostBuddy 2025
      </footer>
    </main>
  )
}