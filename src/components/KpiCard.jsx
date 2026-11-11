import { formatCompact } from '../utils/formatNumber.js'

function KpiCard({ title, value, fullValue, change, icon }) {
    return (
        <div className="w-full max-w-[220px] rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-gray-500">{title}</span>

                {icon && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                        {icon}
                    </div>
                )}
            </div>

            <div className="mt-2">
                <p className="group relative w-fit cursor-help text-xl font-semibold tracking-tight text-gray-900 tabular-nums">
                    <span>{value}</span>
                    {fullValue != null && (
                        <span className="pointer-events-none absolute left-0 bottom-full z-10 mb-1 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                            {fullValue}
                        </span>
                    )}
                </p>

                {change > 0 && (
                    <span className="mt-1 block text-xs text-gray-400">+{formatCompact(change)} today</span>
                )}
            </div>
        </div>
    )
}

export default KpiCard
