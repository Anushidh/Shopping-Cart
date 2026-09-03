# Codenzic Shopping Cart Application

## Project Overview
A responsive, high-performance shopping cart application built with React and TypeScript. The application features a minimalist, fashion-forward UI architecture inspired by premium ecommerce brands. Users can browse a live product catalog, filter and sort items, manage their shopping cart, view rich product details with interactive image galleries, and proceed through a fully validated multi-step checkout flow.

## Technologies Used
- **Frontend Framework**: React 19 (via Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Validation**: Zod
- **Testing**: Vitest
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
- **Run unit tests**: `pnpm test`
- **Build for production**: `pnpm build`
- **Preview production build**: `pnpm preview`

## API Used
This project consumes the free public API endpoints:
- All Products: `https://dummyjson.com/products?limit=100`
- Single Product: `https://dummyjson.com/products/{id}`

## Features Completed
- **Responsive Product Grid**: Displays a large product catalog in a clean grid layout.
- **Advanced Filtering & Sorting (Bonus)**: Users can search by title, filter by category, filter by max price, and sort (Price Low-to-High, High-to-Low, Highest Rated) instantly on the client side.
- **Product Details View (Bonus)**: Dynamic routing to a dedicated product page (`/product/:id`) featuring an interactive thumbnail image gallery.
- **Skeleton Loading (Bonus)**: Prevents layout shifting during API fetches for a premium UX.
- **Dark Mode (Bonus)**: Class-based dark mode implementation with `localStorage` persistence and a custom toggle.
- **Global Cart State**: Zustand store with built-in `localStorage` persistence.
- **Cart Rules Enforcement**: Strict logic limits (min 1, max 5 items per product).
- **Unit Testing (Bonus)**: Vitest suite covering complex cart math (subtotal, tax, and conditional discounts).
- **Multi-Step Checkout Flow**: Custom-built wizard (Cart Review, Shipping, Payment Summary) using pure React state (No third-party form libraries).
- **API & Form Validation**: Strict Zod schemas validate both the API responses and the Shipping form inputs.

## Known Limitations
- The "Place Order" button currently mocks a success state and clears the cart, as no actual payment gateway integration was requested.
- Because the DummyJSON API does not natively support complex multi-parameter querying on the server side, filtering and sorting are handled purely on the client side to ensure a snappy user experience.
- Server-side pagination was not implemented. Instead, a larger payload (`limit=100`) is fetched upfront to allow seamless, instant client-side filtering and sorting across the entire catalog without layout shifts.
- The native `fetch` API is used directly within hooks. For a scaled production app, a centralized API client (like Axios) would be implemented to manage global interceptors, timeouts, and standard error handling.
- The application is a Client-Side Rendered (CSR) SPA. For production-grade SEO (dynamic meta tags, OpenGraph), it would require `react-helmet-async` or a migration to an SSR framework like Next.js.
