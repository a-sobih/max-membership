
const Tooltip = ({ text, children }) => {
    const [show, setShow] = useState(false);
    return (
        <span className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            {show && (
                <span style={{
                    position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)",
                    background: "#0f0f14", color: "#e2c97e", fontSize: "11px", padding: "5px 10px",
                    borderRadius: "6px", whiteSpace: "nowrap", border: "1px solid #e2c97e44",
                    boxShadow: "0 4px 20px #0009", zIndex: 50, pointerEvents: "none",
                }}>
                    {text}
                    <span style={{
                        position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
                        border: "5px solid transparent", borderTopColor: "#e2c97e44",
                    }} />
                </span>
            )}
        </span>
    )
}

export default Tooltip