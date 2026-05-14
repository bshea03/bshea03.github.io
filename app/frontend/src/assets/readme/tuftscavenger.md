# TuftScavenger

TuftScavenger is a mobile-first web app built to help incoming Tufts University students explore campus through an interactive scavenger hunt. Developed by a team of four Tufts students, the app blends location-based challenges, campus trivia, and real-time feedback to create an engaging onboarding experience for new students.

---

## Features

- **Scavenger Hunt** — Navigate to campus landmarks using Google Maps integration.
- **JumboTour** — Explore key locations and learn about Tufts history and culture.
- **Quiz Module** — Test your knowledge of campus landmarks after completing the tour.
- **Mobile-First Design** — Optimized for real-time navigation on mobile devices.
- **Admin Tools** _(optional)_ — Create, edit, and manage scavenger hunt content.

---

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Deployment**: Heroku
- **APIs**: Google Maps API

---

## Getting Started

### Prerequisites

- Node.js ≥ 14.x
- npm or yarn
- Google Maps API key (for location services)

### Installation

```bash
# Clone the repo
git clone https://github.com/bshea03/tufts-scavenger.git
cd tufts-scavenger

# Install dependencies
npm install

# Start the server
npm start
```

### Configuration

Create a `.env` file in the root directory:

```env
GOOGLE_MAPS_API_KEY=your-api-key-here
PORT=3000
```

---

## Usage

Once running locally, open `http://localhost:3000` in your browser.  
New users can begin the scavenger hunt, explore campus via JumboTour, and take quizzes to test their knowledge.

> Designed for mobile-first interaction—try it on your phone for the full experience!

---

## Project Structure

```
tufts-scavenger/
├── public/            # Static assets
├── src/               # Core app logic
│   ├── routes/        # Express routes
│   ├── views/         # HTML templates
│   └── scripts/       # Client-side JS
├── .env.example
├── server.js
└── README.md
```
