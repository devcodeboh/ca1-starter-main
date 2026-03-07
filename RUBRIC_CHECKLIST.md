# CA1 Rubric Checklist (Volcano Watch)

## Baseline (40-55%)

- [x] 4 core views implemented: Welcome, Dashboard, Collection Details, About
- [x] Content loaded from JSON stores
- [x] Welcome/About include meaningful text

## Good (55-70%)

- [x] Welcome and About include images
- [x] Dashboard links to details page
- [x] Controllers contain comments for readability

## Excellent (70-85%)

- [x] 4+ views implemented (extra `Safety` view added)
- [x] Complete category/item content rendered from JSON stores
- [x] Dashboard uses icon link to details page
- [x] App uses custom color and layout style in CSS
- [x] Controller logic is commented and separated by concern

## Outstanding (>85%)

- [x] 4+ views with complete data rendering from JSON
- [x] Icon-based navigation from Dashboard to Details
- [x] Distinct visual style with custom layout
- [x] JavaScript output interaction added (`alert` + `confirm` in `public/script.js`)

## Manual QA Checklist

- [x] `GET /` returns `200`
- [x] `GET /dashboard` returns `200`
- [x] `GET /dashboard/cat-01` returns `200`
- [x] `GET /about` returns `200`
- [x] Menu navigation works across all pages
- [x] Details page shows all item properties
- [x] About page shows contact, map image, and app stats

## Stretch Ideas (Optional)

- [ ] Add filtering by risk level on Dashboard
- [ ] Add search by volcano name
- [ ] Add charts for eruption recency
