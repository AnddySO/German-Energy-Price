import InfoButton from "./InfoButton";

const FilterBar = ({ startDate, setStartDate, endDate, setEndDate, selectedMarket, setSelectedMarket }) => {
    return(
        <div
            style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
            padding: "16px 24px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            marginBottom: "24px",
            }}
        >
            {/* Start Date */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#333" }}>
                Start Date
            </label>
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                padding: "6px 10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
                transition: "0.2s",
                fontSize: "0.9rem",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2ca02c")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
            </div>

            {/* End Date */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#333" }}>
                End Date
            </label>
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{
                padding: "6px 10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
                transition: "0.2s",
                fontSize: "0.9rem",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2ca02c")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
            </div>


            {/* Market Selector + Info button */}
            <InfoButton
            selectedMarket={selectedMarket}
            setSelectedMarket={setSelectedMarket}
            />


            {/* Reset Button */}
            <button
            onClick={() => {
                setStartDate("");
                setEndDate("");
            }}
            style={{
                alignSelf: "flex-end",
                backgroundColor: "#2ca02c",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background-color 0.2s, transform 0.1s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#249024")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2ca02c")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.97)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
            Reset
            </button>
        </div>
    )
}

export default FilterBar;