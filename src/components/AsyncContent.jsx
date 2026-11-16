function AsyncContent({ isLoading, error, isEmpty, children }) {
    if (isLoading) {
        return (
            <div role="status" className="flex items-center gap-3 p-6 text-gray-500">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
                Loading data...
            </div>
        )
    }

    if (error) {
        return (
            <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                Failed to load data: {error}
            </div>
        )
    }

    if (isEmpty) {
        return <div className="p-6 text-gray-500">No data to display.</div>
    }

    return children
}

export default AsyncContent
