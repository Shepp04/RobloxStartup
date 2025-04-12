import './globals.css'

export const metadata = {
  title: 'BoostBuddy',
  description: 'Boost your Roblox game to the front page.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  )
}
