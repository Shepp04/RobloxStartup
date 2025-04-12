type FeatureCardProps = {
    title: string
    desc: string
}

export default function FeatureCard({ title, desc}: FeatureCardProps) {
    return (
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 text-left">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-600">{desc}</p>
        </div>
    )
}