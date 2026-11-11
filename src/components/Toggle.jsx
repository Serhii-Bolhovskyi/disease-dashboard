
function Toggle({ isOn, onToggle, labelOn, labelOff }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="w-[220px] rounded-lg border p-2 transition-colors hover:bg-gray-50"
        >
            {isOn ? labelOn : labelOff}
        </button>
    )
}

export default Toggle
