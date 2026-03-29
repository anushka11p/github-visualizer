import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function CommitChart({ data }) {
  return (
    <div style={{ height: 200 }}>
      <Bar
        data={{
          labels: data.map(d => d.date),
          datasets: [{
            label: "Commits",
            data: data.map(d => d.count),
            backgroundColor: "rgba(0, 255, 136, 0.5)",
            borderColor: "#00ff88",
            borderWidth: 1,
            borderRadius: 3,
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: "#6b7280", font: { family: "monospace", size: 10 } }, grid: { color: "#1c2128" } },
            y: { ticks: { color: "#6b7280", font: { family: "monospace", size: 10 } }, grid: { color: "#1c2128" } },
          }
        }}
      />
    </div>
  );
}