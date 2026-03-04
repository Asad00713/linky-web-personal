# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Linky is a Next.js 16 web application using the App Router, React 19, TypeScript 5, and Tailwind CSS 4.

## Commands

- **Dev server:** `npm run dev` (port 3000)
- **Production build:** `npm run build`
- **Start production:** `npm start`

No linting or testing frameworks are configured yet.

## Architecture

- **Next.js App Router** — all routes live under `app/`. Server Components are the default.
- **Styling** — Tailwind CSS 4 with utility classes, dark mode via `dark:` variant (uses `prefers-color-scheme`). Theme CSS variables defined in `app/globals.css`.
- **Fonts** — Geist Sans and Geist Mono loaded via `next/font/google` in `app/layout.tsx`, applied as CSS variables `--font-geist-sans` and `--font-geist-mono`.
- **Path alias** — `@/*` maps to the project root (configured in `tsconfig.json`).
- **TypeScript** — strict mode enabled, target ES2017, bundler module resolution.
