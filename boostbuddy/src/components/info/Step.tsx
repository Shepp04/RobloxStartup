type StepProps = {
    number: string
    title: string
}

export default function Step({ number, title }: StepProps) {
    return (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-xl mb-2">
            {number}
          </div>
          <p className="text-gray-700 font-medium">{title}</p>
        </div>
    )
}