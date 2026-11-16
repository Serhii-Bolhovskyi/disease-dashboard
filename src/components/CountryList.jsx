import { useState } from 'react'
import { formatCompact } from '../utils/formatNumber'

const ALL_CONTINENTS = 'All'

function CountryList({ countries }) {
    const [continent, setContinent] = useState(ALL_CONTINENTS)

    const continents = [ALL_CONTINENTS, ...new Set(countries.map((c) => c.continent).filter(Boolean))]

    const visibleCountries =
        continent === ALL_CONTINENTS ? countries : countries.filter((c) => c.continent === continent)

    return (
        <div className="w-full max-w-[320px] rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-gray-500">Countries</span>

                <select
                    value={continent}
                    onChange={(e) => setContinent(e.target.value)}
                    className="rounded-lg border px-2 py-1 text-sm"
                >
                    {continents.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            <ul className="mt-3 max-h-[320px] divide-y divide-gray-100 overflow-y-auto">
                {visibleCountries.map((country) => (
                    <li key={country.country} className="flex items-center justify-between py-2 text-sm">
                        <span className="text-gray-900">{country.country}</span>
                        <span className="tabular-nums text-gray-500">{formatCompact(country.cases)}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CountryList
