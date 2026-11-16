import { useMemo, useState } from 'react'

function compare(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return String(a ?? '').localeCompare(String(b ?? ''))
    }
    return (a ?? 0) - (b ?? 0)
}

export function useSort(rows, initialKey, initialDirection = 'asc') {
    const [sort, setSort] = useState({ key: initialKey, direction: initialDirection })

    const sortedRows = useMemo(() => {
        const factor = sort.direction === 'asc' ? 1 : -1
        return [...rows].sort((a, b) => compare(a[sort.key], b[sort.key]) * factor)
    }, [rows, sort])

    function toggleSort(key) {
        setSort((prev) => {
            if (prev.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
            }
            const isText = typeof rows[0]?.[key] === 'string'
            return { key, direction: isText ? 'asc' : 'desc' }
        })
    }

    return { sortedRows, sort, toggleSort }
}
