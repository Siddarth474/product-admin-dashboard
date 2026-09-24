# Product Admin Dashboard

A modern, responsive Product Management Admin Dashboard built with **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, powered by the [DummyJSON API](https://dummyjson.com).

---

## 🚀 Features & What Has Been Finished

### 1. Authentication & Security
- **Token & Cookie Authentication**: Login integration using DummyJSON `/auth/login` endpoint with access token stored in cookies and localStorage for session persistence.
- **Route Protection & Middleware**: Next.js middleware protecting `/product` and `/product/[id]` routes, redirecting unauthenticated users to `/login`.
- **Automatic Redirects**: Root route (`/`) automatically redirects authenticated users or leads to `/login`.
- **Logout Flow**: Client-side logout clearing session cookies and local storage before routing back to login.
- **Consistent Cohesive Theme**: Login page redesigned to cleanly match the dashboard aesthetic with subtle zinc styling, demo credentials box, and loading feedback.

### 2. Product Management (CRUD Operations)
- **Product Listing**:
  - Desktop responsive table view displaying thumbnail, title, category badge, formatted price (INR), stock status, and actions.
  - Mobile card view specifically optimized for smaller screens.
- **Create Product**:
  - Modal form (`ProductFormModal`) with client-side validation (title, price, stock, category, rating).
  - Optimistic UI updates with instant feedback and toast/state sync.
- **Edit Product**:
  - Pre-filled modal supporting updates to title, price, description, category, and inventory levels.
- **Delete Product**:
  - Custom delete confirmation dialog (`DeleteConfirmModal`) with item name preview and safety warnings.

### 3. Search, Filter, Sort & Pagination
- **Search**: Debounced search query integrated with DummyJSON search endpoint.
- **Category Filter**: Category dropdown with dynamic category listing from API.
- **Sorting**: Multi-parameter sorting by `price`, `rating`, or `title` with both ascending and descending order options.
- **Pagination**: Configurable page size selector (10, 20, 50) and page navigation controls.

### 4. Product Details View (`/product/[id]`)
- **Interactive Gallery**: Thumbnail selector and main image viewer.
- **Detailed Product Specifications**: Category, rating, INR converted price, availability status, stock count, and description.
- **Customer Reviews**: Dynamic customer feedback display with ratings and review dates.
- **Error & Loading States**: Dedicated skeleton loading screen and custom 404 page for missing or invalid IDs.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router & Turbopack)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **HTTP Client**: Axios with interceptors
- **API**: DummyJSON REST API

---

## 📦 Getting Started & Setup Steps

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version `18.18+` or `20+` recommended)
- `npm` (or `pnpm` / `yarn` / `bun`)

### 2. Clone the Repository
```bash
git clone https://github.com/Siddarth474/product-admin-dashboard.git
cd product-admin-dashboard
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note**: Visiting `http://localhost:3000` will redirect you to `/login`.

---

## 🔑 Demo Credentials

You can sign in using DummyJSON test user credentials:

| Field | Value |
|---|---|
| **Username** | `emilys` |
| **Password** | `emilyspass` |

*(Alternative DummyJSON users: `michaelw` / `michaelwpass`)*

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the development server on `http://localhost:3000` |
| `npm run build` | Builds the application for production |
| `npm run start` | Starts the production build server |
| `npm run lint` | Runs ESLint checks across the codebase |

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── layout.tsx                # Root layout with fonts & metadata
│   ├── page.tsx                  # Root redirection logic
│   ├── login/
│   │   └── page.tsx              # Login page with demo credentials
│   ├── product/
│   │   ├── page.tsx              # Products listing page with Suspense
│   │   ├── [id]/
│   │   │   ├── page.tsx          # Dynamic product detail page
│   │   │   ├── loading.tsx       # Details skeleton loading state
│   │   │   └── not-found.tsx     # Custom 404 for invalid product
│   │   └── components/
│   │       ├── DeleteConfirmModal.tsx
│   │       ├── LogoutButton.tsx
│   │       ├── ProductFilters.tsx
│   │       ├── ProductFormModal.tsx
│   │       ├── ProductGallery.tsx
│   │       ├── ProductInfo.tsx
│   │       ├── ProductListSkeleton.tsx
│   │       ├── ProductMobileCard.tsx
│   │       ├── ProductReviews.tsx
│   │       ├── ProductSearch.tsx
│   │       ├── ProductsContent.tsx
│   │       ├── ProductsPagination.tsx
│   │       ├── ProductTable.tsx
│   │       └── ProductTableRow.tsx
├── hooks/
│   ├── useLogin.ts               # Login form handler & validation
│   ├── useProductForm.ts         # Add/edit product form state & validation
│   └── useProducts.ts            # Fetching, filtering, sorting, pagination & CRUD state
├── lib/
│   └── axios.ts                  # Configured Axios instance with interceptors
├── services/
│   ├── auth.service.ts           # Authentication APIs & cookie handlers
│   └── product.service.ts        # DummyJSON products API methods & types
├── utils/
│   └── currencyConvertor.ts      # USD to INR conversion utility
└── middleware.ts                 # Route guard for authenticated paths
```
