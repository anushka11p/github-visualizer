const BASE = "https://api.github.com";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: "application/vnd.github+json",
};

export async function fetchUser(username) {
  const res = await fetch(`${BASE}/users/${username}`, { headers });
  return res.json();
}

export async function fetchRepos(username) {
  const res = await fetch(`${BASE}/users/${username}/repos?per_page=100&sort=pushed`, { headers });
  return res.json();
}

export async function fetchCommits(username, repo) {
  const res = await fetch(`${BASE}/repos/${username}/${repo}/commits?per_page=100`, { headers });
  return res.json();
}