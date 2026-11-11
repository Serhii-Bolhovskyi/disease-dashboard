import { ChartNoAxesColumnIncreasing, Activity, HeartHandshake, EyeClosed, Earth } from 'lucide-react'

export const CARDS = [
    {
        id: 'cases',
        title: 'Total Cases',
        icon: <ChartNoAxesColumnIncreasing />,
        absoluteKey: 'cases',
        perMillionKey: 'casesPerOneMillion',
        todayKey: 'todayCases',
    },
    {
        id: 'active',
        title: 'Active Cases',
        icon: <Activity />,
        absoluteKey: 'active',
        perMillionKey: 'activePerOneMillion',
    },
    {
        id: 'recovered',
        title: 'Total Recovered',
        icon: <HeartHandshake />,
        absoluteKey: 'recovered',
        perMillionKey: 'recoveredPerOneMillion',
        todayKey: 'todayRecovered',
    },
    {
        id: 'deaths',
        title: 'Total Deaths',
        icon: <EyeClosed />,
        absoluteKey: 'deaths',
        perMillionKey: 'deathsPerOneMillion',
        todayKey: 'todayDeaths',
    },
    {
        id: 'countries',
        title: 'Affected Countries',
        icon: <Earth />,
        absoluteKey: 'affectedCountries',
    },
]
