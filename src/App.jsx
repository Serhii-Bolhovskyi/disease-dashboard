import { useState } from 'react'
import data from './data/covid19All.json'
import { CARDS } from './data/cards.jsx'
import { COUNTRIES } from './data/countries.js'
import { formatCompact, formatFull, formatPerMillion } from './utils/formatNumber.js'
import KpiCard from './components/KpiCard.jsx'
import Toggle from './components/Toggle.jsx'
import Counter from './components/Counter.jsx'
import CountryList from './components/CountryList.jsx'

function App() {
    // Стан режиму живе тут, бо від нього залежать і кнопка, і картки
    const [isPerMillion, setIsPerMillion] = useState(false)

    const toggleMode = () => setIsPerMillion((prev) => !prev)

    return (
        <div className="m-2 mt-4">
            <div className="flex w-full items-center justify-between pb-4">
                <h1 className="text-xl font-medium">Global COVID-19 statistics: cases and outcomes</h1>
                <Toggle
                    isOn={isPerMillion}
                    onToggle={toggleMode}
                    labelOn="Show Stats Per Million"
                    labelOff="Show Absolute"
                />
            </div>

            <div className="flex flex-wrap gap-4">
                {CARDS.map((card) => {
                    const showPerMillion = isPerMillion && card.perMillionKey !== undefined
                    const raw = data[showPerMillion ? card.perMillionKey : card.absoluteKey]

                    return (
                        <KpiCard
                            key={card.id}
                            title={card.title}
                            icon={card.icon}
                            value={showPerMillion ? formatPerMillion(raw) : formatCompact(raw)}
                            fullValue={showPerMillion ? undefined : formatFull(raw)}
                            change={!showPerMillion && card.todayKey ? data[card.todayKey] : undefined}
                        />
                    )
                })}
            </div>

            <div className="mt-6 flex flex-wrap items-start gap-4">
                <Counter label="Observation period (days)" initialValue={7} step={1} min={1} max={30} />
                <CountryList countries={COUNTRIES} />
            </div>
        </div>
    )
}

export default App
