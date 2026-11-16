import { formatFull } from '../utils/formatNumber'

// Опис колонок: ключ поля, підпис і чи це число (для вирівнювання)
const COLUMNS = [
    { key: 'country', label: 'Country' },
    { key: 'continent', label: 'Continent' },
    { key: 'cases', label: 'Cases', isNumeric: true },
    { key: 'deaths', label: 'Deaths', isNumeric: true },
    { key: 'recovered', label: 'Recovered', isNumeric: true },
    { key: 'active', label: 'Active', isNumeric: true },
    { key: 'casesPerOneMillion', label: 'Cases / 1M', isNumeric: true },
]

function SortIndicator({ direction }) {
    return <span aria-hidden="true">{direction === 'asc' ? '▲' : '▼'}</span>
}

// Presentational: отримує вже відсортовані рядки та стан сортування, сам нічого не рахує.
function CountriesTable({ rows, sort, onSort }) {
    return (
        <div className="max-h-[480px] overflow-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-50 text-gray-500">
                    <tr>
                        {COLUMNS.map((column) => {
                            const isActive = sort.key === column.key
                            const ariaSort = isActive
                                ? sort.direction === 'asc'
                                    ? 'ascending'
                                    : 'descending'
                                : 'none'

                            return (
                                <th
                                    key={column.key}
                                    aria-sort={ariaSort}
                                    className={`px-3 py-2 font-medium ${column.isNumeric ? 'text-right' : 'text-left'}`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => onSort(column.key)}
                                        className="inline-flex items-center gap-1 hover:text-gray-900"
                                    >
                                        {column.label}
                                        {isActive && <SortIndicator direction={sort.direction} />}
                                    </button>
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {rows.map((row) => (
                        <tr key={row.country} className="hover:bg-gray-50">
                            <td className="px-3 py-2">
                                <div className="flex items-center gap-2 text-gray-900">
                                    <span className="h-3 w-5 shrink-0">
                                        {row.countryInfo?.flag && (
                                            <img src={row.countryInfo.flag} alt="" className="h-3 w-5 object-cover" />
                                        )}
                                    </span>
                                    {row.country}
                                </div>
                            </td>
                            <td className="px-3 py-2 text-gray-500">{row.continent || '—'}</td>
                            {COLUMNS.filter((column) => column.isNumeric).map((column) => (
                                <td key={column.key} className="px-3 py-2 text-right tabular-nums text-gray-700">
                                    {formatFull(row[column.key] ?? 0)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CountriesTable
