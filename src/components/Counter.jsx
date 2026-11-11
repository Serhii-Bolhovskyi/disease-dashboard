import { useState } from 'react'

function Counter({ label = 'Counter', initialValue = 0, step = 1, min = 0, max = 100 }) {
    const [count, setCount] = useState(initialValue)

    const increment = () => setCount((prev) => Math.min(prev + step, max))
    const decrement = () => setCount((prev) => Math.max(prev - step, min))
    const reset = () => setCount(initialValue)

    const buttonClass = 'h-8 w-8 rounded-lg border text-lg leading-none hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent'

    return (
        <div className="w-full max-w-[220px] rounded-xl border border-gray-200 bg-white p-4">
            <span className="text-sm font-medium text-gray-500">{label}</span>

            <div className="mt-3 flex items-center justify-between">
                <button type="button" className={buttonClass} onClick={decrement} disabled={count <= min}>
                    −
                </button>
                <span className="text-xl font-semibold tabular-nums text-gray-900">{count}</span>
                <button type="button" className={buttonClass} onClick={increment} disabled={count >= max}>
                    +
                </button>
            </div>

            <button
                type="button"
                onClick={reset}
                className="mt-3 text-xs text-gray-400 hover:text-gray-600"
            >
                Reset
            </button>
        </div>
    )
}

export default Counter
