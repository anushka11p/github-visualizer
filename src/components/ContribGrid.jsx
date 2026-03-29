function getColor(count){
    if(count ===0) return "#1a1f2e";
    if(count<4) return "#0e4429";
    if(count<8) return "#006d32";
    if(count<14) return "#26a641";
    return "#39d353";
}

export default function ContribGrid({ weeks }) {
    return (
        <div style = {{display: "flex", gap:2 }}>
            {weeks.map((week, wi)=>(
                <div key={wi} style={{diplay: "flex", flexDirection:"column", gap:2}}>
                    {week.map((count, di)=>(
                        <div
                        key={di}
                        title={`${count} contributions`}
                        style={{
                            width: 11,
                            height: 11,
                            background: getColor(count),
                            borderRadius:2,
                        }}
                        />
                    ))}
                    </div>
            ))}
        </div>
    );
}