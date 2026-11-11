
const compactFormatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
})

const fullFormatter = new Intl.NumberFormat('en-US')

const perMillionFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
})

export const formatCompact = (n) => compactFormatter.format(n)
export const formatFull = (n) => fullFormatter.format(n)
export const formatPerMillion = (n) => perMillionFormatter.format(n)
