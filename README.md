# CORA Leaderboard – Frontend

## What is this?

The CORA Leaderboard is a web application for *TEAM CORA – Coburger Radsport e.V.*, a German cycling club. It runs a points-based competition where club members compete on pre-defined Strava segments across recurring two-week challenge periods. The leaderboard tracks sprint and climbing performance separately, displays rankings, and allows athletes to register by connecting their Strava account.

The UI is fully in German.

---

## Core Concepts

| Concept | Description |
|---|---|
| **Challenge** | A two-week period with one designated sprint segment and one designated climb segment on Strava. |
| **Segment** | A named Strava segment with a type (`sprint` or `climb`), distance, and elevation gain. |
| **Effort** | An athlete's recorded time on a segment during a challenge window. |
| **Result** | The ranked outcome of an effort within a challenge, including awarded points and position. |
| **Classification** | The overall standings aggregated across all challenges, split by sprint and climb categories. Only a subset of results (best N of M) count toward the final tally. |

---

## Features

### Leaderboard Views
- **Classification view (Gesamtwertung):** Overall standings for all athletes, sorted by total points in the selected category. Shows rank, name, total points, and a counted/completed ratio (e.g. "3/5 gewertet"). The overall sprint leader gets a green jersey visual; the climb leader gets a polka-dot styling (Tour de France jersey conventions).
- **Challenge view (Wertungen):** Per-challenge results. Athletes can navigate between challenges using prev/next arrows or a dropdown. Auto-selects the currently active challenge on load.

### Filtering
- **Category filter:** Sprint vs. Climb — switches both views.
- **Gender filter:** Männer (M) vs. Frauen (F) — filters all views independently.

### Strava Integration
- Athletes register by clicking "Anmelden", which redirects them through Strava's OAuth flow (`client_id=127158`, scopes: `read,activity:read`).
- On return, the frontend exchanges the OAuth code against the backend, which registers the athlete in the database. The athlete's Strava profile photo URL is stored in a 7-day cookie to indicate a logged-in session.
- Logging out clears the cookie and reloads the page. There is no server-side session — authentication state is cookie-only on the frontend.

### Informational Overlays
- **Riders overview (Fahrer):** Modal listing all registered athletes with their gender.
- **Challenges overview (Challenges):** Modal with a table of all challenges including segment names and date ranges.
- **Legal pages:** Impressum, Datenschutzerklärung, Cookie Richtlinie, and Spielregeln are loaded from markdown files at runtime and rendered in dialogs.

### Backend Cold-Start Handling
The backend is hosted on Render.com and spins down after inactivity. The frontend detects slow responses: after 5 seconds it shows a "server is waking up" dialog; after 90 seconds it transitions to an error state.

---

## Architecture

### Tech Stack

| Layer | Technology |
|---|---|
| Build tool | Vite |
| Language | TypeScript |
| Framework | React |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| Component library | shadcn/ui (Radix UI primitives) |
| Data fetching | Native `fetch` + `useState` (React Query is set up but not actively used) |
| Markdown rendering | `react-markdown` + `remark-gfm` |

### Project Structure

```
src/
├── App.tsx                  # Router setup — two routes: / and *
├── pages/
│   ├── Index.tsx            # Only real page; owns all application state
│   └── NotFound.tsx         # 404 fallback
├── components/
│   ├── leaderboard/         # Domain-specific components
│   │   ├── ClassificationView.tsx
│   │   ├── ChallengeView.tsx
│   │   ├── ChallengesOverview.tsx
│   │   ├── RidersOverview.tsx
│   │   ├── FilterToggle.tsx
│   │   ├── JoinButton.tsx   # Exports SignUpButton
│   │   ├── UserMenu.tsx
│   │   ├── SegmentBadge.tsx
│   │   └── LegalDialog.tsx
│   └── ui/                  # shadcn/ui primitives (generic, not domain-specific)
├── lib/
│   ├── api.ts               # API client (LeaderboardAPI class + exported helpers)
│   └── utils.ts             # Tailwind class merge utility
├── types/
│   └── leaderboard.ts       # All domain types
└── hooks/
    ├── use-mobile.tsx
    └── use-toast.ts
public/
└── content/                 # Markdown files for legal pages
    ├── impressum.md
    ├── datenschutz.md
    ├── cookies.md
    └── spielregeln.md
```

### API Client (`lib/api.ts`)

Base URL is controlled by the `VITE_API_URL` environment variable (defaults to the Render.com backend).

| Function | Endpoint | Purpose |
|---|---|---|
| `getChallenges()` | `GET /challenges` | All challenges with segments and computed status |
| `getChallenge(id)` | `GET /challenges/:id` | Single challenge detail |
| `getChallengeResults(id)` | `GET /challenges/:id/results` | All results for a challenge |
| `getClassification()` | `GET /classification` | Overall standings |
| `getAthletes()` | `GET /athletes` | All registered athletes |
| `exchangeTokenWithStrava(code, scope)` | `GET /exchange_token` | OAuth token exchange / athlete registration |

### Data Types (`types/leaderboard.ts`)

| Type | Notable fields |
|---|---|
| `Athlete` | `id`, `name`, `gender: 'M' \| 'F'` |
| `Challenge` | `id`, `start_date`, `end_date`, `sprint_segment`, `climb_segment`, `status: 'upcoming' \| 'active' \| 'completed'` |
| `Segment` | `id`, `name`, `type: 'sprint' \| 'climb'`, `distance`, `elevation_gain?` |
| `Result` | `athlete_id`, `athlete_name`, `athlete_gender`, `segment_type`, `time` (seconds), `points`, `position` |
| `Classification` | `athlete_id`, `athlete_name`, `gender`, `total_sprint_points`, `total_climb_points`, `completed_climbs`, `completed_sprints`, `counted_climbs`, `counted_sprints` |

---

## Local Development

**Prerequisites:** Node.js 18+ and npm (or bun).

```sh
# Install dependencies
npm install

# Start dev server (connects to localhost backend by default)
VITE_API_URL=http://localhost:5000/api npm run dev

# Production build
npm run build
```

The backend must be running separately. See the `cora-leaderboard` backend repository for setup instructions.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `https://cora-leaderboard.onrender.com/api` | Base URL of the backend API |
