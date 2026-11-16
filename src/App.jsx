import { useMemo, useState } from 'react'
import { CARDS } from './data/cards'
import { useCountries } from './hooks/useCountries'
import { useSort } from './hooks/useSort'
import { aggregateStats } from './utils/aggregateStats'
import { formatCompact, formatFull, formatPerMillion } from './utils/formatNumber'
import AsyncContent from './components/AsyncContent'
import KpiCard from './components/KpiCard'
import Toggle from './components/Toggle'
import Counter from './components/Counter'
import CountriesTable from './components/CountriesTable'
import CountryList from './components/CountryList'

function App() {
    const { countries, isLoading, error } = useCountries()
    const { sortedRows, sort, toggleSort } = useSort(countries, 'cases', 'desc')

    const [isPerMillion, setIsPerMillion] = useState(false)
    const toggleMode = () => setIsPerMillion((prev) => !prev)

    const stats = useMemo(() => aggregateStats(countries), [countries])

    return (
        <div className="m-2 mt-4">
            <div className="flex w-full items-center justify-between pb-4">
                <h1 className="text-xl font-medium">Global COVID-19 statistics: cases and outcomes</h1>
                <Toggle
                    isOn={isPerMillion}
                    onToggle={toggleMode}
                    labelOn="Show Absolute"
                    labelOff="Show Stats Per Million"
                />
            </div>

            <AsyncContent isLoading={isLoading} error={error} isEmpty={countries.length === 0}>
                <div className="flex flex-wrap gap-4">
                    {CARDS.map((card) => {
                        const showPerMillion = isPerMillion && card.perMillionKey !== undefined
                        const raw = stats[showPerMillion ? card.perMillionKey : card.absoluteKey]

                        return (
                            <KpiCard
                                key={card.id}
                                title={card.title}
                                icon={card.icon}
                                value={showPerMillion ? formatPerMillion(raw) : formatCompact(raw)}
                                fullValue={showPerMillion ? undefined : formatFull(raw)}
                                change={!showPerMillion && card.todayKey ? stats[card.todayKey] : undefined}
                            />
                        )
                    })}
                </div>

                <section className="mt-6">
                    <h2 className="mb-2 text-lg font-medium">Countries</h2>
                    <CountriesTable rows={sortedRows} sort={sort} onSort={toggleSort} />
                </section>

                <div className="mt-6 flex flex-wrap items-start gap-4">
                    <Counter label="Observation period (days)" initialValue={7} step={1} min={1} max={30} />
                    <CountryList countries={countries} />
                </div>
            </AsyncContent>
        </div>
    )
}

export default App
