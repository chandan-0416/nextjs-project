# Setup the environment in VS Code Editor for the Project
  - Next.js + React.js + TypeScript
  - install next.js with Typescript
  - initialize, configure
  - run the App (npm run dev)
  - C:\Users\chand\OneDrive\Desktop\NextJS-Project\nextjs-project> npm run dev

# Practice : Check this websites for better UI (Travel Related websites)
1. https://www.booking.com/
2. https://www.makemytrip.com/
3. https://www.klook.com/

# Layout of the Project 
- Header
     - Logo
     - Product
     - About
     - Features
     - Pricing
     - Shopping Cart icon (React Context / local storage => view the stored products & Count)

- Body / Main Page
     - Show your Product (Button)
     # Navigate to Products Page
        { Modification on Product Page
             - scroll on filter side bar and products list
             - Responsive for All devices
             - Background color in Cards
             - Hovering on Card (highlight)
             - Search everything from searchBar below the Header
             - Tags (product type)
             - Horizontal scrolling of same type of products
             - Badge on some products (Higher Order Components)
             - Image in Cart look different
             - Pagination* (to the Products list with 9 Carts)
             - sticky footer layout
             - if I click mutiple time it's just store one product in shopping cart and further product add or reduce according to the  increment/decrement click.
             - check box multi - option with 6 and remain with see more | multi-select checkbox list & “See more / See less” toggle
             - chevron right  " > "
             - in detail page suggestions of selected products
             - If I scroll up/down Body Part, Header should not scroll same (sticky). | sticky header or fixed navigation barL
             - If I select multiple check box, url change --> one variable= store selected box name with comma, and also further like this.
             Or keep that tags variable in sync as you add/remove checkboxes (including back/forward navigation).
             - Top Search Bar
        }
            - Filter Products
                  - Search Title
                  - Category Items
                  - Tags Items
                  - Rating
                  - Price Range
            - Products Cart in Grid , If I click on the product Cart It navigate to the Single Product detail page
     # Navigate to Detail Page
            - Detail product
            - back to product
            - Add to Cart , If I click on Add to cart button the products store into the shopping Cart. 
                  and when I click on shopping cart, it views the store items and navigate to the Cart Page.
     # Navigate to the Cart Page
           - increment and decrement button
           - Clear Cart button
           - Remove Cart button
           - Checkout buttom. if I click on the checkout button, it navigate to the Checkout Page.
     # Navigate to the checkout Page
           - Order Summary
           - shipping details
                    - full name, email, address, payment methods
                    - Payment methods
                              - Credit/Debit Card Details
                              - PayPal Details
                    - Place order button, if I click on the place order , It navigate to the successful payment order page. (continue shopping button)
     # Order Placed ---> Order Successfully!
                   
- Footer
    - Address
    - features
    - subscribe
    - email
    - follow us

# Short Summary Of Project:
    I'm working on the demo website like e-commerce. (using Dummy JSON api)
    1. I made the Product list with the filter box like search, tags, catgetory, rating and price range.
    2. I used (react routing) LINK tag to navigate the Page : Detail Page of Single Product, Checkout Page with Order Summary and Place the order Successfully.
    3. I also made Shopping Cart Store/storage with Count using React Context, when I added product Cart, It store there.

# Extra Work | Concepts: 
1. Core part of building professional Next.js apps (especially with TypeScript and App Router) | layout wise
   - error.tsx (custom error handling)
   - loading.tsx (skeleton or spinner during data fetch)
   - not-found.tsx (custom 404 page)
2. loading.tsx / suspense ?  -> To show fallback (like a spinner or skeleton) if aysnc ops or lazy loaded code is there.
     React.suspense - component level loading
     loading.tsx  - route level loading
3. How I make the Error.ts, loading page and page not found, Layout wise using TypeScript and Next.js?
4. Next.js uses Turbopack (the new dev bundler) to detect your project root directory —
that’s where your next.config.js, package.json, and node_modules are. It found multiple lockfiles (for example):
 - package-lock.json (used by npm)
 - yarn.lock (used by Yarn)
 - or pnpm-lock.yaml (used by pnpm)
When more than one lockfile exists, Turbopack gets confused about which package manager / root directory to use.
5. Make sure - Page.tsx --> No "use client" , bcz we want Page.tsx run on server side.
6. Suspense (use at components level, skelton show and aslo show in url) and loading page
# Suspense
a> Suspense is a React feature that lets components wait (“suspend”) for asynchronous data before rendering.
b> It helps manage loading states automatically and improves the user experience when dealing with async operations — such as fetching data, lazy-loading components, or waiting for server-rendered content.
c> Waiting for server-rendered content => The period when a server component is fetching data before sending its HTML to the browser.
d> Suspense Attributes/props - fallback, children and key.
e> Sometimes, you want to refresh or re-suspend a component — for example, when a filter changes or a new ID is selected. You can use the key prop on Suspense to remount the children.
f> Using a key prop with <Suspense> is a powerful trick to retrigger Suspense fallback (like your skeleton) whenever a dependency changes — for example, when filters, search text, or pagination parameters change.
7. Server Components (async fetch) & Client Components (lazy load)
# Routing in Next.js
a> Routing in Next.js is file-based — the folder and file structure inside your app/ (or older pages/) directory automatically defines your URL routes.No need to manually configure routes like in React Router — it’s automatic.
b> Each folder with a page.tsx file automatically becomes a route.
c> Dynamic Routes (param) - To handle URLs with parameters (like /products/5).
d> Next.js uses file-system based routing, meaning you can use folders and files to define routes. This page will guide you through how to create layouts and pages, and link between them.
8. 
# Navigation between Pages
a> Use Next.js’s <LINK> component from next/link for client-side navigation.
b> Programmatic Navigation (useRouter)
c> params represents the dynamic segments from the URL path — that is, parts of the route surrounded by square brackets [ ].
d> searchParams represents the query string in the URL (the part after ?).
9. Frontend System Design
# Low Level Design (LLD)
- Component Design
- Config Driven UI
- Shimmer UI
- Routing & Prouting Routes
- State Management + Libraries
- Multi language Support
- Infinte Scroll
- Accorion
- Reddit Nested Comments
- Image Slider
- Pagination
- Real Time Updates
- Youtube Live Stream chat UI
- Auto complete & Search Box
10. TypeScript - tsconfig.js file =>TypeScript compiler how to process your code, which files to include, and which features to enable or disable.
11. Folder Structure
```{
    - 📦Project Name/
├── 📁 app/
│   ├── layout.tsx                 # Root layout (common header/footer/providers)
│   ├── page.tsx                   # Home page
│   ├── error.tsx                  # Global error boundary (UI for runtime errors)
│   ├── loading.tsx                # Global loading state (skeleton/spinner)
│   ├── not-found.tsx              # 404 Page
│   │
│   ├── 📁 product/
│   │   ├── page.tsx               # Product listing page
│   │   ├── layout.tsx             # Layout specific to /product
│   │   ├── loading.tsx            # Loading spinner for product routes
│   │   ├── error.tsx              # Error boundary for /product
│   │   ├── not-found.tsx          # Custom not found for product
│   │   ├── 📁 [id]/               # Dynamic route
│   │   │   └── page.tsx           # Product details page
│   │   └── 📁 components/         # Components related to product pages
│   │       ├── ProductCard.tsx
│   │       ├── FilterSidebar.tsx
│   │       └── ProductList.tsx
│   │
│   ├── 📁 cart/
│   │   ├── page.tsx               # Shopping cart page
│   │   └── components/
│   │       └── CartItem.tsx
│   │
│   └── 📁 api/                    # Next.js Route Handlers (server functions)
│       ├── route.ts               # Example: /api
│       └── products/
│           └── route.ts           # Example API endpoint (/api/products)
│
├── 📁 components/                 # Reusable UI components (shared across app)
│   ├── Header.tsx
│   ├── Footer.tsx
├── 📁 hooks/                      # Custom React hooks
│   ├── useCart.ts
│   ├── useDebounce.ts
│   └── useFetch.ts
│
├── 📁 lib/                        # Helper utilities (non-UI logic)
│   ├── api.ts                     # Centralized API functions
│   ├── constants.ts               # Global constants
│   ├── utils.ts                   # Utility/helper functions
│   └── types.ts                   # Global TypeScript types/interfaces
│
├── 📁 context/                    # Global contexts
│   ├── CartContext.tsx
│   └── ThemeContext.tsx
│
├── 📁 styles/                     # Global styles (Tailwind, custom CSS)
│   ├── globals.css
│   └── tailwind.css
│
├── 📁 public/                     # Static files (images, icons, fonts)
│   ├── logo.svg
│   ├── favicon.ico
│   └── images/
│       └── banner.png
│
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── next.config.mjs                # Next.js configuration
├── postcss.config.js              # PostCSS configuration
├── package.json
└── README.md
}