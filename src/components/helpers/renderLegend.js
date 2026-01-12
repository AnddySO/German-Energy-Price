export const renderLegend = ({ payload, visibleLines, toggleLine }) => (
    <div style={{ textAlign: "center", marginBottom: "10px" }}>
      {payload.map((entry) => {
        const isActive = visibleLines[entry.value];
        return (
          <span
            key={entry.value}
            onClick={() => toggleLine(entry.value)}
            style={{
              marginRight: 20,
              cursor: "pointer",
              color: isActive ? entry.color : "#bbb",
              fontWeight: isActive ? "bold" : "normal",
              userSelect: "none",
              transition: "color 0.2s",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                backgroundColor: isActive ? entry.color : "#bbb",
                marginRight: 6,
                borderRadius: "50%",
                verticalAlign: "middle",
              }}
            />
            {entry.value}
          </span>
        );
      })}
    </div>
  );