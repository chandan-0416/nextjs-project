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
9. TypeScript - tsconfig.js file =>TypeScript compiler how to process your code, which files to include, and which features to enable or disable.
10. (App Router), there are two main ways to fetch data:
a> Server-side fetching — happens before the page is sent to the browser.
b> Client-side fetching — happens after the page loads in the browser.
And there are API Routes, which act as the backend endpoints for your app.
c> page ---> page.tsx Renders a UI route (user-facing page) => page.tsx defines a frontend route (like /product) :  ← UI page (frontend)
d> Route Handler --->  route.ts  Creates an API endpoint (server logic) => route.ts defines a backend API route (like /api/product) : API endpoint (server logic)
11. 
```{Concept                   	  Summary
API Routes	             Used as backend endpoints for CRUD operations.
Dynamic API Route([id])	   Handle dynamic resource (like /api/products/2).
Server Components	        Fetch data before rendering → good for SEO & speed.
Client Components	        Fetch data after render → good for interactivity.
TypeScript	             Define interfaces (Product) to ensure type safety everywhere.}
```
12. API Routes in Next.js = mini backend functions.
Each route (route.ts) can handle:
- GET → Read data
- POST → Create data
- PUT / PATCH → Update data
- DELETE → Delete data
They run only on the server — so you can safely use databases or API keys here.
13. An API Route Proxy in Next.js means you create your own internal API endpoints (using /app/api/...) that forward or process requests to another backend or external API (like TMDB, DummyJSON, or your database).
- Frontend → Your Next.js API → External API / DB
- This acts as a secure middle layer.
- Why Use an API Proxy?
```{  
  Reason	                Explanation
🔒 Security	          Hide your secret keys (e.g., TMDB, Stripe, etc.) from frontend
🧠 Logic Layer	          Add validation, transformation, or filtering before sending data
⚡ Performance	         Enable caching (ISR or revalidation)
🧰 Flexibility	          If API changes later, you only update your proxy route — not all components
🔄 Reuse	               Central place for all API logic (CRUD, auth, etc.)
}
```
14. Folder Structure
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
```
15. Data Flow Summary
```
{
┌─────────────────────────────┐
│        API Route            │
│ /app/api/products/route.ts  │
│ Handles GET, POST, etc.     │
└────────────┬────────────────┘
             │
      fetch("/api/products")
             │
┌────────────▼────────────────┐
│     Server Component         │
│ app/products/page.tsx        │
│ Pre-renders HTML for SEO     │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│     Client Component         │
│ "use client" + useEffect()   │
│ Interactive UI, live updates │
└─────────────────────────────┘
}
```

 #### 
 {
- App folder structure
- client component, server component
- Routing, Nested Route, nested layout, page.ts, layout.ts, dynamic route, dynamic route segment- catch all segments, 
- Link component
- App router
- API route => act as backend end points
- route group
- Image component
- params(props) , search params, useSearch params
- error.tsx, loading.tsx, not found.tsx 
- shimmer UI
- suspense
- Live Cart Preview on the same page
- Breadcrumb Navigation
- useMemo is a React Hook used to optimize performance by memoizing (caching) the result of an expensive calculation.
 }

###### ▶️▶️▶️

1. Best Practices | Production Level App
# Development Workflow
- Use npm run dev for development with hot reloading
- Run npm run type-check to verify TypeScript types
- Use npm run lint to check for linting errors
- Run npm run build to create production build
# Performance Optimization
- Use code splitting with dynamic imports
- Enable tree-shaking in production builds
- Use React.memo and useMemo for expensive computations
- Lazy load non-critical components
# Common Pitfalls
- TypeScript configuration: Ensure strict mode is enabled
- ESLint + Prettier conflicts: Use eslint-config-prettier to disable conflicting rules
- Slow builds: Consider using Vite or esbuild for faster development
- Missing type definitions: Install @types packages for all dependencies
- Debugging issues: Ensure source maps are properly configured
# Recommended Tools
- Bundlers: Vite, Webpack, Parcel
- Testing: Jest, React Testing Library, Cypress
- Linting/Formatting: ESLint, Prettier, Stylelint
- Documentation: TypeDoc, Storybook
- Performance: Web Vitals, Lighthouse

# Basics Fundamentals (0s,1s) : 
1. Most modern programming languages are conceptually inherited from the C programming language — directly or indirectly.
2. The Root: Assembly & Machine Language : 
a> At the very base, Machine Language (binary 0s and 1s) is the only language the CPU truly understands.
b> Assembly Language came next — a human-readable symbolic form of machine code.
c> Every programming language eventually compiles or interprets down to machine code.
3. Early High-Level Languages (1950s–1960s)
a> FORTRAN (1957) — for mathematical/scientific computing
b> COBOL (1959) — for business applications
c> ALGOL (1958) — introduced structured programming and influenced C, Pascal, and many others.
4. All modern programming languages are ultimately inherited from Assembly Language, but C is considered the fundamental ancestor of almost all modern high-level languages.

# Low Level Design
- Component design
- Config driven UI
- Shimmer UI
- Routing & Protected Routes
- Statement management & Libraries
- Multi-lamguage Support
- Infinite Scroll
- Accordion
- Reddit Nested Comments
- Image Slider
- Pagination Part 1/2
- Real time update
- youtube live stream chat UI
- Auto complete & Search Box

###### ▶️▶️▶️

# Application of Next.js & TypeScript 's documentation in project (Practice):

1. Next.js 
a> Installation
b> Project Structure
c> Layouts & Pages
d> Linking and Navigating
e> Server and Client components
f> Cache Components
g> Fetching Data
h> Updating Data
i> Caching and Revalidating
j> Error Handling
k> CSS
l> Image Optimization
m> Font Optimization
n> Meta and OG Images
o> Route Handlers
p> Proxy
q> Deploying
r> Upgrading

# Layouts and Pages 👍
Next.js uses file-system based routing, meaning you can use folders and files to define routes. This page will guide you through how to create layouts and pages, and link between them.
- Page : A page is UI that is rendered on a specific route.
- Layout : A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender.
- Dynamic Route segment, params, searchParams, useSearchParams
- (Route Group), [Dynamic Route segment], Nested Dynamic route segment
- Dynamic route : params, searchParams(passing data into queryString of server component), useSearchParams(client component), catch-all segment([...slug]) as sub-cotegories.
# Client component, when we need to use
- State and event handlers. E.g. onClick, onChange.
- Lifecycle logic. E.g. useEffect.
- Browser-only APIs. E.g. localStorage, window, Navigator.geolocation, etc.
- Custom hooks.
# Server component, when you need to use
- Fetch data from databases or APIs close to the source.
- Use API keys, tokens, and other secrets without exposing them to the client.
- Reduce the amount of JavaScript sent to the browser.
- Improve the First Contentful Paint (FCP), and stream content progressively to the client.
- Caching is the process of storing frequently accessed data in a temporary, high-speed storage layer (a cache) to serve future requests faster than accessing the original data source.
- all server IO (database calls, APIs, computations).
# Telemetry Monitering
- Telemetry monitoring is the remote, continuous tracking of a patient's vital signs, most commonly heart rhythm, using electrodes on the body that transmit data to a central station.
# Fetching Data
- Server Components
    - You can fetch data in Server Components using any asynchronous I/O, such as: The fetch API, An ORM or database, Reading from the filesystem using Node.js APIs like fs.

- Client Components
    - There are two ways to fetch data in Client Components, using: React's use hook and A community library like SWR or React Query
# Streaming
- There are two ways you can leverage streaming in your application:
1. Wrapping a page with a loading.js file
2. Wrapping a component with <Suspense>

# Route Handlers
- Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs.
- Good to know: Route Handlers are only available inside the app directory. They are the equivalent of API Routes inside the pages directory meaning you do not need to use API Routes and Route Handlers together.

# database schema 
1. A database schema serves as the blueprint for a database, defining its structure and organization in a formal language supported by a database management system (DBMS). It outlines how data is logically stored, including the relationships between different tables and other database objects. 
2. These schemas act as blueprints for your data, specifying field types, required fields, default values, and even custom validation logic.


###### Some changes in the projects :

1. Breadcrums link: Home > Product > Cart > Checkout
2. landing page
3. This hook allows you to programmatically change routes inside Client Component
4. fully Responsive Page
- Breadcrumbs are a navigation aid that shows the user the path to the current page — kind of like a trail of links to go back in hierarchy.
- TailwindCSS provides responsive utilities: sm:, md:, lg:, xl:  (sm:small screens, md: medium screen, lg: large screen)
- Breadcrumb button / link : clickable navigation link showing page hierarchy.
- Responsive page: layout/components automatically adjust to screen sizes using TailwindCSS classes (sm:, md:, lg:, etc.) in Next.js.
- sort dropdown - sort by : Price (low to high or high to low).

# Library and Framework
- A library is a collection of reusable functions that you call whenever you need them.
- A framework defines the overall structure of your application and calls your code — this is called inversion of control.