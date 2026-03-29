export default function StatsCard({label, value, color}){
    return(
        <div style={{
            background: "#161b22",
            border: "1px solid #30363d",
            borderRadius: 8,
            padding: "16px 20px",
        }}>
            <p style={{margin: 0, fontSize: 11, color: "6b7280", fontFamily:"monospace" }}>
                {label}
            </p>
            <p style={{margin: "6px 0 0", fontSize: 22, fontWeight:700, color: color || "#00ff88", fontFamily:"monospace"}}>
                {value}
            </p>
        </div>
    );
}