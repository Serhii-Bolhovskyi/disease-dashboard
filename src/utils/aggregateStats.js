const SUM_KEYS = [
    'cases',
    'todayCases',
    'deaths',
    'todayDeaths',
    'recovered',
    'todayRecovered',
    'active',
]

export function aggregateStats(countries) {
    const totals = {}
    for (const key of SUM_KEYS) {
        totals[key] = countries.reduce((sum, country) => sum + (country[key] ?? 0), 0)
    }

    const population = countries.reduce((sum, country) => sum + (country.population ?? 0), 0)
    const perMillion = (value) => (population > 0 ? (value / population) * 1_000_000 : 0)

    return {
        ...totals,
        casesPerOneMillion: perMillion(totals.cases),
        deathsPerOneMillion: perMillion(totals.deaths),
        recoveredPerOneMillion: perMillion(totals.recovered),
        activePerOneMillion: perMillion(totals.active),
        affectedCountries: countries.length,
    }
}
