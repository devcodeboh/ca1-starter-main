# Volcano Watch (CA1)

Volcano Watch is my CA1 student project built with Express + Handlebars using MVC. I used an `ActivityCollection`-style JSON structure and customized it for volcano categories and records.

## App Purpose

The app helps users quickly explore volcano information by category:
- `Dashboard` lists only category titles.
- `Collection details` shows full properties for each volcano item.
- `About` includes contact info, map image, and app statistics from JSON data.

This project was designed to practice:
- routing and controller/view separation
- reading and rendering JSON data collections
- applying custom CSS styling and basic JavaScript output interactions

## Views Implemented

1. Welcome (`/`)
2. Dashboard (`/dashboard`)
3. Collection Details (`/dashboard/:id`)
4. About (`/about`)
5. Safety Tips (extra view) (`/safety`)

## Data Model

### Activity store
File: `models/activity-store.json`

- `activityCollection` (array)
- Each category has: `id`, `title`, `activities`
- Each activity (volcano record) has:
  - `id`
  - `name`
  - `country`
  - `lastEruption`
  - `riskLevel`
  - `heightM`
  - `monitoringStatus`

### App metadata store
File: `models/app-store.json`

Contains:
- App name/tagline/welcome text
- Contact details
- Map image data
- Static statistics

## Run

```bash
npm install
npm start
```

Open: `http://localhost:3000`

## Notes

- Controllers include inline comments to explain handler logic.
- Dashboard links to details page using an icon action.
- Custom CSS theme and layout are applied in `public/style.css`.
- Basic JavaScript output interaction (`alert`/`confirm`/`prompt`) is in `public/script.js`.
- Author/contact section is intentionally formatted as student assignment content.
