# 🌍 Countries Explorer

Vue 3 + TypeScript web application to explore countries by continent built as a portfolio project.

## Features

- Browse continents and their countries
- Basic country information
- Filter countries by currency and reset
- Back to top component
- Responsive grid layout with hover effects
- 404 redirect for invalid continent codes
- Fully typed with TypeScript + GraphQL
- Basic styling, this is only a demonstration of Vue 3 + TypeScript as opposed to styling skills

## Tech Stack

- **Framework**: Vue 3 + `<script setup>` + Composition API
- **Language**: TypeScript
- **Styling**: SCSS
- **GraphQL Client**: Apollo Client + `@vue/apollo-composable`
- **Routing**: Vue Router
- **State Management**: Reactive composables + `computed()`
- **Build Tool**: Vite

## Project Structure

```text
src/
├── components/           # Reusable UI components
├── composables/          # Custom logic
├── graphql/              # GraphQL queries
├── router/               # Vue Router configuration
├── scss/                 # Global styles
├── types/                # TypeScript interfaces
├── views/                # Page components
├── App.vue
└── main.ts
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
