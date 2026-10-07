# Computer Organization & Architecture (COA) Academic Platform

An interactive academic portfolio and architectural simulation suite designed and developed by **Richa Sharma** (Chandigarh University).

- **GitHub:** https://github.com/Rich12-max
- **LinkedIn:** https://www.linkedin.com/in/richa-sharma-b55244382/

---

## Direct Vercel Deployment (Zero-Config)

This repository is structured as a **standalone, serverless React application** that deploys directly to Vercel with **zero backend setup**:

1. Push this repository to GitHub.
2. In the Vercel Dashboard, import the repository.
3. Vercel automatically detects the framework:
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** 
pm run build
   - **Output Directory:** dist
4. Click **Deploy**. Your site is immediately live with custom routing and instant performance!

---

## Clean Repository Architecture

`	ext
├── public/                 # Static public assets (profile photo, icons)
├── src/
│   ├── components/         # FloatingNav, CPU illustration, simulators
│   ├── context/            # ThemeContext (5 themes with localStorage persistence)
│   ├── data/               # Standalone academic data (assignments, achievements, projects)
│   ├── pages/              # Home, About Me, COA Learning, Simulators, Assignment 1, Gallery, GitHub
│   ├── services/           # Pure client-side radix converter & cache simulator engines
│   ├── App.jsx             # React Router routing configuration
│   ├── index.css           # Design system tokens and multi-theme styling
│   └── main.jsx            # Application entrypoint
├── index.html              # SPA HTML root with anti-FOUC theme bootstrapper
├── package.json            # Node.js project manifest & build scripts
├── vercel.json             # Vercel SPA routing rewrite rules
└── vite.config.js          # Vite build and dev configuration
`

---

## Local Development

`ash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build optimized production bundle
npm run build
`
