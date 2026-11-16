import { useEffect, useState } from 'react'

const COUNTRIES_URL = 'https://disease.sh/v3/covid-19/countries'

export function useCountries() {
    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        async function loadCountries() {
            try {
                const response = await fetch(COUNTRIES_URL, { signal: controller.signal })
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`)
                }
                const json = await response.json()
                setCountries(json)
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message)
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }

        loadCountries()

        return () => controller.abort()
    }, [])

    return { countries, isLoading, error }
}
