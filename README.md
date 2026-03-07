# Volcano Watch (CA1)

Volcano Watch is my CA1 project for Web Development. It is built with Express, Handlebars and MVC structure.

## What the app does

- Dashboard shows volcano categories (titles only)
- Details page shows full data for items inside a category
- About page shows contact info, map, and stats from JSON

## Pages

1. Welcome (`/`)
2. Dashboard (`/dashboard`)
3. Collection Details (`/dashboard/:id`)
4. About (`/about`)
5. Safety Tips (`/safety`)

## Data Structure

### `models/activity-store.json`

- `activityCollection` (array)
- Category fields: `id`, `title`, `activities`
- Item fields:
  - `id`
  - `name`
  - `image`
  - `imageAlt`
  - `country`
  - `lastEruption`
  - `riskLevel`
  - `heightM`
  - `monitoringStatus`

### `models/app-store.json`

Contains app name, welcome text, contact details, map image and static stats.

## Run

```bash
npm install
npm start
```

Open `http://localhost:3000`

## Notes

- Controllers have short comments for clarity
- Dashboard uses icon link to details page
- Basic JS outputs are in `public/script.js` (`alert`, `prompt`, `confirm`)
