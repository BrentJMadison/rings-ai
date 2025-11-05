# Rick and Morty Character Autocomplete

An autocomplete search component built with Next.js, Material UI 7, and GraphQL for searching Rick and Morty characters.

## Features

- **Real-time Search**: Debounced search with GraphQL queries to the Rick and Morty API
- **Rich Suggestions**: Display character avatars, names, species, and status in suggestions
- **Responsive Design**: Clean, mobile-friendly interface built with Material UI
- **Selection Display**: Selected character details shown below the search field

## Tech Stack

- **Next.js 14** - React framework with App Router
- **Material UI 7** - Component library for clean, responsive UI
- **Apollo Client** - GraphQL client for data fetching
- **TypeScript** - Type safety and better DX
- **Rick and Morty GraphQL API** - Public API for character data

## Getting Started

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Implementation Details

### Requirements Met

✅ User can search for characters (entity type)
✅ Suggestions appear as user types
✅ Clicking a suggestion completes the search field with the character name
✅ Clean, responsive interface with Material UI
✅ GraphQL integration with Apollo Client
✅ Next.js App Router architecture

### Key Components

- **CharacterAutocomplete.tsx** - Main autocomplete component with debounced search
- **apolloClient.ts** - Apollo Client configuration
- **queries.ts** - GraphQL queries and TypeScript interfaces

### Features

- 300ms debounce to prevent excessive API calls
- Loading indicators during search
- Avatar images in suggestions
- Character details display on selection
- Error handling for failed queries
- Responsive design for mobile and desktop
# rings-ai
