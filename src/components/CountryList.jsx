import { useState } from 'react'
import { ALL_CONTINENTS } from '../data/countries.js'
import { formatCompact } from '../utils/formatNumber.js'

// Дані приходять пропсом, стан фільтра живе тут, бо більше нікому не потрібен.
function CountryList({ countries }) {
    const [continent, setContinent] = useState(ALL_CONTINENTS)

    // Категорії виводимо з даних, а не пишемо вручну
    const continents = [ALL_CONTINENTS, ...new Set(countries.map((c) => c.continent))]

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

            <ul className="mt-3 divide-y divide-gray-100">
                {visibleCountries.map((country) => (
                    <li key={country.id} className="flex items-center justify-between py-2 text-sm">
                        <span className="text-gray-900">{country.country}</span>
                        <span className="tabular-nums text-gray-500">{formatCompact(country.cases)}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CountryList
