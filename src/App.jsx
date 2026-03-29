import { useState, useEffect } from "react";
import StatsCard from "./components/StatsCard";
import ContribGrid from "./components/ContribGrid";
import CommitChart from "./components/CommitChart";
import RepoList from "./components/RepoList";
import { fetchUser, fetchRepos, fetchCommits } from "./hooks/useGitHub";

function generateGrid(commits) {
  const weeks = Array.from({ length: 53 }, () => Array(7).fill(0));
  commits.forEach(commit => {
    const date = new Date(commit.commit.author.date);
    const today = new Date();
    const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    if (diffDays < 371) {
      const week = Math.floor(diffDays / 7);
      const day = date.getDay();
      weeks[52 - week][day]++;
    }
  });
  return weeks;
}

export default function App() {
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [grid, setGrid] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!input.trim()) return;
    setLoading(true);
    setUsername(input.trim());

    const userData = await fetchUser(input.trim());
    setUser(userData);

    const repoData = await fetchRepos(input.trim());
    const top5 = repoData.slice(0, 5).map(r => ({
      name: r.name,
      commits: r.size,
    }));
    setRepos(top5);

    // fetch commits from top repo
    const allCommits = await fetchCommits(input.trim(), repoData[0].name);
    setGrid(generateGrid(allCommits));

    // chart data — last 30 days
    const last30 = Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      return {
        date: d.toLocaleDateString("en", { month: "short", day: "numeric" }),
        count: allCommits.filter(c => {
          const cd = new Date(c.commit.author.date);
          return cd.toDateString() === d.toDateString();
        }).length
      };
    });
    setChartData(last30);
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", color: "#c9d1d9", padding: 24, fontFamily: "monospace" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#39d353" }} />
        <span style={{ fontSize: 18, fontWeight: 700, color: "#f0f6fc" }}>DevPulse</span>
      </div>

      {/* Search */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          placeholder="Enter GitHub username..."
          style={{
            background: "#161b22", border: "1px solid #30363d", borderRadius: 6,
            padding: "10px 14px", color: "#c9d1d9", fontFamily: "monospace",
            fontSize: 14, width: 280, outline: "none",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: "#238636", border: "none", borderRadius: 6,
            padding: "10px 20px", color: "#fff", fontFamily: "monospace",
            fontSize: 14, cursor: "pointer",
          }}
        >
          {loading ? "Loading..." : "Analyze →"}
        </button>
      </div>

      {user && !loading && (
        <>
          {/* User info */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <img src={user.avatar_url} alt="avatar" style={{ width: 48, height: 48, borderRadius: "50%" }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f0f6fc" }}>{user.name || user.login}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>@{user.login} · {user.public_repos} repos</div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
            <StatsCard label="Followers" value={user.followers} color="#00ff88" />
            <StatsCard label="Following" value={user.following} color="#00ccff" />
            <StatsCard label="Public Repos" value={user.public_repos} color="#c77dff" />
          </div>

          {/* Contribution Grid */}
          <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 8, padding: 20, marginBottom: 24 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 13, color: "#f0f6fc" }}>Contribution Activity</h3>
            <ContribGrid weeks={grid} />
          </div>

          {/* Commit Chart */}
          <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 8, padding: 20, marginBottom: 24 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 13, color: "#f0f6fc" }}>Commit Frequency (Last 30 Days)</h3>
            <CommitChart data={chartData} />
          </div>

          {/* Repo List */}
          <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 8, padding: 20 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 13, color: "#f0f6fc" }}>Top Repositories</h3>
            <RepoList repos={repos} />
          </div>
        </>
      )}

      {loading && (
        <div style={{ textAlign: "center", color: "#6b7280", marginTop: 60 }}>
          Fetching data...
        </div>
      )}
    </div>
  );
}
