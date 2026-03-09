import { LEVEL_COLORS } from "@/constants/colors";
import Tooltip from "./Tooltip"

const FeatureRow = ({ feature, isActive, showLevel }) => {
    return (
        <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "9px 14px", borderRadius: "8px",
            background: isActive ? "rgba(226,201,126,0.06)" : "rgba(255,255,255,0.02)",
            borderLeft: isActive ? "2px solid #e2c97e" : "2px solid transparent",
            opacity: feature.dev ? 0.45 : 1,
            transition: "all .2s",
            marginBottom: "4px",
        }}>
            {isActive ? (
                <span style={{ color: "#5ddb8a", fontWeight: 700, fontSize: "14px", minWidth: "20px" }}>✓</span>
            ) : (
                <span style={{ color: "#444", fontWeight: 700, fontSize: "14px", minWidth: "20px" }}>—</span>
            )}
            <span style={{ flex: 1, fontSize: "13.5px", color: isActive ? "#e8dfc8" : "#666", fontFamily: "'DM Sans', sans-serif" }}>
                {feature.label}
            </span>
            {feature.dev && (
                <Tooltip text="Under Development – Coming Soon">
                    <span style={{
                        fontSize: "10px", padding: "2px 7px", borderRadius: "20px",
                        background: "rgba(255,160,60,0.15)", color: "#ffa03c", border: "1px solid #ffa03c44",
                        cursor: "help", fontFamily: "monospace",
                    }}>DEV</span>
                </Tooltip>
            )}
            {showLevel && feature.level >= 1 && (() => {
                const levelStyle = LEVEL_COLORS[feature.level] || {};

                return (
                    <span
                        style={{
                            fontSize: "10px",
                            padding: "2px 7px",
                            borderRadius: "20px",
                            background: levelStyle.glow,
                            color: levelStyle.primary,
                            border: `1px solid ${levelStyle.primary}33`,
                            fontFamily: "monospace",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        Lv{feature.level}
                    </span>
                );
            })()}
        </div>
    )
}

export default FeatureRow
