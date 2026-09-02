# Codenzic Shopping Cart Application

## Project Overview
A responsive, high-performance shopping cart application built with React and TypeScript. The application features a minimalist, fashion-forward UI architecture inspired by premium ecommerce brands. Users can browse a live product catalog, filter items by category, price, and search terms, manage their shopping cart, and proceed through a fully validated multi-step checkout flow.

## Technologies Used
- **Frontend Framework**: React 19 (via Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Validation**: Zod
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Setup Instructions
1. Ensure you have Node.js and `pnpm` installed on your machine.
2. Clone the repository to your local machine.
3. Navigate into the project directory: `cd shopping-cart`
4. Install all dependencies.

## Commands to run the project
- **Install dependencies**: `pnpm install`
- **Start development server**: `pnpm dev`
- **Build for production**: `pnpm build`
- **Preview production build**: `pnpm preview`

## API Used
This project consumes the free public API:
`https://dummyjson.com/products`

## Features Completed
- **Responsive Product Grid**: Displays a large product catalog in a clean grid layout.
- **Custom Filtering Hook**: Users can search by title, filter by category, and filter by maximum price instantly.
- **Global Cart State**: Zustand store with built-in `localStorage` persistence.
- **Cart Rules Enforcement**: Strict logic limits (min 1, max 5 items per product).
- **Multi-Step Checkout Flow**: Custom-built wizard (Cart Review, Shipping, Payment Summary) using pure React state (No Formik/React Hook Form used).
- **API & Form Validation**: Strict Zod schemas validate both the API responses and the Shipping form inputs.
- **Advanced UI/UX**: Centralized minimalist design system using Tailwind `@layer`, comprehensive loading/error/empty states, and a sticky global Navbar.
- **Bonus Feature**: Minimalist, high-contrast Dark/Light mode architectural equivalent.

## Known Limitations
- The "Place Order" button currently mocks a success state and clears the cart, as no actual payment gateway integration was requested.
- Product sorting (High-to-Low, Low-to-High) was not implemented, though robust local filtering was prioritized instead.
- Because the DummyJSON API does not natively support complex multi-parameter querying on the server side, filtering is handled purely on the client side to ensure a snappy user experience.
