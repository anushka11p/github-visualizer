export default function RepoList({ repos }) {
  const max = Math.max(...repos.map(r => r.commits));

  return (
    <div>
      {repos.map(repo => (
        <div key={repo.name} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: "#c9d1d9", fontFamily: "monospace" }}>
              {repo.name}
            </span>
            <span style={{ fontSize: 12, color: "#00ff88", fontFamily: "monospace", fontWeight: 700 }}>
              {repo.commits}
            </span>
          </div>
          <div style={{ height: 6, background: "#1c2128", borderRadius: 3 }}>
            <div style={{
              height: "100%",
              width: `${(repo.commits / max) * 100}%`,
              background: "#00ff88",
              borderRadius: 3,
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}