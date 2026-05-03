# Assignment 2 Rubric Checklist (Volcano Watch)

## Baseline (40-55%)

- [x] Create collection and detail/item records
- [x] Signup/login pages implemented
- [x] Simple totals displayed on Welcome/About
- [x] Images available for collections and items
- [x] Simple feature: display logged-in username and avatar

## Good (55-70%)

- [x] Delete collection and detail/item records
- [x] Login checks the email and password
- [x] Avg/min/max statistics displayed
- [x] Collection image upload
- [x] Two simple features: delete confirmation and responsive form styling

## Excellent (70-85%)

- [x] Update item workflow
- [x] Sort functionality
- [x] Password validation rules
- [x] Statistics for the current user
- [x] Detail/item image upload
- [x] Complex feature: each user only sees their own collections

## Outstanding (85%+)

- [x] Search functionality for collections and items
- [x] User statistics including user with most collections
- [x] Profile image upload and profile page
- [x] Extra feature: custom Handlebars `formatDate` helper
- [x] Extra feature: profile page

## Manual QA Checklist

- [x] `GET /` shows app purpose and live stats
- [x] `GET /signup` allows a new user with profile image
- [x] `GET /login` authenticates a demo user
- [x] `/dashboard` is protected when logged out
- [x] Dashboard can add/delete/search/sort collections
- [x] Details can add/update/delete/search/sort items
- [x] About shows global and user statistics
- [x] Profile can update profile image

## Demo Account

- Email: `bohdan@example.com`
- Password: `Password1!`
