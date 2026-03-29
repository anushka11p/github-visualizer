# DevPulse - GitHub Contribution Visualizer

A developer-focused analytics dashboard that visualizes GitHub contribution patterns, commit frequency, and repository activity for any public GitHub user.

## Features

-  Contribution grid heatmap
-  Commit frequency bar chart (last 30 days)
-  Top repositories by size
-  User profile stats (followers, following, public repos)

## Tech Stack

- React + Vite
- Chart.js + react-chartjs-2
- GitHub REST API

## Getting Started

### 1. Clone the repo

git clone https://github.com/anushka11p/github-visualizer.git
cd github-visualizer

### 2. Install dependencies

npm install

### 3. Set up environment variables

Create a `.env` file in the root:

VITE_GITHUB_TOKEN=your_github_token_here

Get your token at: https://github.com/settings/tokens?type=beta

### 4. Run the app

npm run dev

Open http://localhost:5173 and search any GitHub username!

## Screenshots

<img width="1088" height="780" alt="Screenshot 2026-03-29 at 11 26 51 PM" src="https://github.com/user-attachments/assets/4a82af9e-53e7-4e53-afe0-1ccd97656c0e" />

## Known Limitations

- Repo numbers show size in KB, not actual commit counts
- Contribution grid is based on commits from the top repo only
- Only works with public GitHub profiles

## Future Improvements(I'm Aiming for)

- [ ] Real contribution data via GitHub GraphQL API
- [ ] Actual commit counts per repo
- [ ] Loading skeletons
- [ ] Shareable profile links
- [ ] Language breakdown chart
