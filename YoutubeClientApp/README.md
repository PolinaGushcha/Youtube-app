# YoutubeClientApp

A single-page Angular client for the [YouTube Data API v3](https://developers.google.com/youtube/v3). Users sign in, search and browse YouTube videos, view details for a single video, mark videos as favorites (persisted with NgRx), and add hand-crafted video cards through a validated reactive form.

## Features

- **Authentication (client-side)** — login and registration forms with reactive-forms validation (email format, password strength rules: length, upper/lower case, letters+digits, special character). Successful login stores the credentials in `localStorage` under the `authData` key; [`canActivateAuth`](src/app/auth/access.guard.ts) guards the `/layout` route tree and redirects unauthenticated users to `/login`.
- **Video search & feed** — the header component queries the YouTube Data API `search` endpoint as the user types (debounced by a simple length check) and enriches every result with view/like/comment counts from the `videos` (`statistics`) endpoint via `forkJoin`. When there's no search query yet, a random topic from a fixed list is used to seed an initial feed (the YouTube API has no "discover" endpoint).
- **Sorting & filtering** — results can be sorted by publish date or view count (ascending/descending toggle) or filtered by a text match against title/description, all computed client-side over the currently loaded feed.
- **Pagination** — a reusable [`PaginationComponent`](src/app/pagination/pagination.component.ts) slices the sorted/filtered feed into pages (configurable page size).
- **Video details page** — navigating to `/layout/item/:id` fetches the single video's snippet and statistics and renders a detail view with a "freshness" color indicator (blue/green/yellow/red depending on how recently it was published, via [`GetBorderColorService`](src/app/layout/services/get-border-color.service.ts)).
- **Publication date indicator** — every video card and the details page render a bottom border whose color reflects the publication date status:

  | Border | Meaning |
  | --- | --- |
  | 🟦 | newer than 7 days |
  | 🟩 | between 7 days and 1 month |
  | 🟨 | between 1 and 6 months |
  | 🟥 | older than 6 months |

- **Favorites** — clicking the heart icon on a card dispatches an NgRx action that adds/removes the video from a `cardState` slice of the store; the `/layout/favorite` route lists everything currently favorited. State is in-memory (NgRx Store + Effects + DevTools), not persisted across reloads.
- **Create custom card** — `/create-card` exposes a reactive form (title, description, image URL, video URL, creation date) with required/length/pattern/custom validators (e.g. a date cannot be in the future) and adds the resulting card to the same favorites store. In-progress form values are cached in memory by [`FormStateService`](src/app/create-card/create-card.service.ts) so they survive navigating away and back.
- **404 page** — any unmatched route renders [`NotFoundPageComponent`](src/app/not-found-page/not-found-page.component.ts).

## Tech stack

- **Angular 18** (standalone components, signals, `provideRouter`/`provideHttpClient`/`provideStore` functional bootstrap in [`app.config.ts`](src/app/app.config.ts))
- **NgRx** (`@ngrx/store`, `@ngrx/effects`, `@ngrx/store-devtools`) for favorites/card state
- **RxJS** for HTTP composition (`forkJoin`, `mergeMap`, `map`)
- **Angular Reactive Forms** for login, registration and card-creation validation
- **Angular Material** (available for UI primitives)
- **date-fns** for date arithmetic (recency coloring)
- **uuid** for generating card IDs
- **Jest** + `jest-preset-angular` + `jest-marbles` for unit testing (replaces the CLI's default Karma/Jasmine setup)
- **ESLint** (`angular-eslint`, `typescript-eslint`) + **Prettier** for linting/formatting
- **Husky** pre-commit hook running tests and `lint-staged`

## Project structure

```text
src/app/
├── api/              # ApiService — wraps YouTube Data API `search`/`videos` endpoints
├── app.routes.ts      # top-level routes (login, registration, layout, create-card, 404)
├── assets/heart/       # like/unlike heart icon component
├── auth/
│   ├── access.guard.ts     # canActivateAuth route guard
│   ├── login/               # login form
│   ├── registration/        # registration form
│   └── services/login.service.ts  # localStorage-backed auth storage
├── create-card/       # reactive form to add a custom video card
├── favorite/           # list of favorited cards
├── header/             # search bar, sorting controls, user menu
├── item/               # single video details page
├── layout/
│   ├── layout.component.ts   # feed container: search results, sorting, pagination, favoriting
│   ├── layout.routers.ts     # lazy-loaded child routes (item/:id, favorite, create-card)
│   └── services/get-border-color.service.ts  # publish-date "freshness" color logic
├── not-found-page/     # 404 route component
├── pagination/         # reusable pagination component + page-range utility service
├── redux/              # NgRx actions, reducer, effects, selectors, state models (`cardState`)
└── types/              # shared interfaces (API responses, auth, forms, sorting)
```

## Routing

| Path | Component | Guard | Notes |
| --- | --- | --- | --- |
| `/login` | `LoginComponent` | – | sets `authData` in `localStorage` |
| `/registration` | `RegistrationComponent` | – | |
| `/layout` | `LayoutComponent` | `canActivateAuth` | video feed with search/sort/pagination |
| `/layout/item/:id` | `ItemComponent` | `canActivateAuth` | lazy-loaded, video details |
| `/layout/favorite` | `FavoriteComponent` | `canActivateAuth` | lazy-loaded, favorited cards |
| `/layout/create-card` | `CreateCardComponent` | `canActivateAuth` | lazy-loaded |
| `/create-card` | `CreateCardComponent` | – | top-level alias (no auth guard) |
| `` (empty) | redirects to `/layout` | – | |
| `**` | `NotFoundPageComponent` | – | catch-all 404 |

## API integration

[`ApiService`](src/app/api/api.service.ts) talks to `https://www.googleapis.com/youtube/v3/`:

- `search?part=snippet&type=video&q=...` — video search
- `videos?part=statistics&id=...` — per-video view/like/comment counts
- `videos?part=snippet&id=...` — single video snippet (details page)

The API key, base URL, and result-per-page limits are configured in [`src/environments/environment.ts`](src/environments/environment.ts) / `environment.development.ts`. Since this is a public client-side key, swap it for your own YouTube Data API v3 key before deploying (enable the API in the [Google Cloud Console](https://console.cloud.google.com/) and restrict the key to your domain).

## State management

Favorites and custom cards live in a single NgRx feature slice, `cardState` (see [`redux/`](src/app/redux/)):

- **Actions** — `addCard`, `deleteCard`, `loadCard` ([`cards.actions.ts`](src/app/redux/cards.actions.ts))
- **Reducer** — `createFeature`/`createReducer` appends/filters the in-memory card array ([`cards.reducer.ts`](src/app/redux/cards.reducer.ts))
- **Effects** — pass-through effects for add/remove (no side effects beyond error handling; state isn't persisted to a backend) ([`cards.effects.ts`](src/app/redux/cards.effects.ts))
- **Selectors** — `selectAllFavoriteCards`, `selectCardById` ([`cards.selectors.ts`](src/app/redux/cards.selectors.ts))

## Getting started

### Prerequisites

- Node.js 18+ and npm
- A YouTube Data API v3 key (see [API integration](#api-integration))

### Install

```bash
npm install
```

### Run the dev server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app reloads automatically on source changes.

### Build

```bash
npm run build
```

Build artifacts are emitted to `dist/`.

## Testing

Unit tests run on Jest (not the Angular CLI's default Karma):

```bash
npm test            # run once, with coverage (see coverage/index.html)
npm run test:watch  # watch mode, verbose
npm run test:ci      # sequential run, used in the pre-commit hook
```

## Linting & formatting

```bash
npm run lint             # ng lint (ESLint + angular-eslint)
npm run prettier:check    # check formatting
npm run prettier:write    # auto-fix formatting
```

A Husky `pre-commit` hook (see [`.husky/pre-commit`](.husky/pre-commit)) runs `npm test` and `lint-staged` on every commit.

## Known limitations

- Authentication is purely client-side (credentials are stored, unencrypted, in `localStorage`); there is no real backend/session.
- The YouTube API key is checked into `environment.ts` for convenience — replace it with your own before any public deployment.
- Favorites/custom cards live only in the NgRx store in memory and are lost on page reload.
- The registration form (`RegistrationComponent`) is currently a placeholder with no fields wired up yet.
