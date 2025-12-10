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
```
{
a> Suspense is a React feature that lets components wait (“suspend”) for asynchronous data before rendering.
b> It helps manage loading states automatically and improves the user experience when dealing with async operations — such as fetching data, lazy-loading components, or waiting for server-rendered content.
c> Waiting for server-rendered content => The period when a server component is fetching data before sending its HTML to the browser.
d> Suspense Attributes/props - fallback, children and key.
e> Sometimes, you want to refresh or re-suspend a component — for example, when a filter changes or a new ID is selected. You can use the key prop on Suspense to remount the children.
f> Using a key prop with <Suspense> is a powerful trick to retrigger Suspense fallback (like your skeleton) whenever a dependency changes — for example, when filters, search text, or pagination parameters change.
}
```
7. Server Components (async fetch) & Client Components (lazy load)
# Routing in Next.js
```
{
a> Routing in Next.js is file-based — the folder and file structure inside your app/ (or older pages/) directory automatically defines your URL routes.No need to manually configure routes like in React Router — it’s automatic.
b> Each folder with a page.tsx file automatically becomes a route.
c> Dynamic Routes (param) - To handle URLs with parameters (like /products/5).
d> Next.js uses file-system based routing, meaning you can use folders and files to define routes. This page will guide you through how to create layouts and pages, and link between them.
}
```
8. 
# Navigation between Pages
```
{
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
}
```
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
- dark mode for the project - nextjs
- 
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

# Asynchronous JS
1. Callback
2. Promises
3. async/await
- When to Use and Avoid Callbacks?
- Use callbacks when
    - Handling asynchronous tasks (API calls, file reading).
    - Implementing event-driven programming.
    - Creating higher-order functions.
- Avoid callbacks when
    - Code becomes nested and unreadable (use Promises or async/await).
    - You need error handling in asynchronous operations (Promises are better).

## MVC [Model view controller]
- MVC is a software architectural pattern that separates an application into three components — Model (data and business logic), View (UI), and Controller (request handling and coordination). This separation makes the application more organized, maintainable, and scalable.
- MVVM separates UI (View), business state (ViewModel), and data (Model), where the View automatically updates itself using two-way data binding with the ViewModel
- Link[https://chatgpt.com/c/692445d3-74e0-8320-ab47-f2e4ee86a7ab]

# Login and Signup in header
1. B2B 
2. B2C
3. dark/light/system mode
4. language
5. tenent code (for crousal data)

8. Authentication:
- Authentication is the process of verifying that a user, device, or system is who or what it claims to be, typically by checking credentials like a password, fingerprint, or security token. It is a key part of security that confirms identity before granting access to resources, preventing unauthorized access and protecting systems, networks, and data.

9. Protected Page v/s Home Page
```
{- A Home Page is a public page.
Anyone can open it — logged in or not logged in.
✔ Characteristics of a Home Page:
No login required
No token/cookie check
Accessible to everyone
Used for: landing page, about, products, contact, etc.
- How Protected Pages Work (Simple Flow)
1. Protected Routes are pages in your app that can be accessed only by authenticated (logged-in) users.
2. If a user is not logged in, you block access and redirect them to:
✔ Login Page
✔ Signup Page
❌ Or show 401 Unauthorized
3. Because some pages contain user-specific or sensitive content like:
Dashboard, Cart / Orders, User Profile, Admin Panel, Payment Page, Settings Page
4. Anyone opening the URL directly (example: /dashboard) should not see content without login.

🔁 Logic:
User tries to open /dashboard
Check if token exists (cookie/localStorage/server validation)
If token exists → allow
If no token → redirect to login page}
```
10. B2B v/s B2C websites 
```
{
    ✅ B2B Website (Business to Business)
A B2B website is a platform where one business sells products or services to another business.
- Examples: 
A wholesaler selling goods to retailers
SaaS tools like Salesforce, HubSpot
Alibaba (businesses buy in bulk)
- Key Characteristics
Bulk orders
Higher pricing tiers
Requires account creation or approval
Focus on long-term business relationships
More technical product details
👉 A B2B website serves companies, not individual customers.

✅ B2C Website (Business to Consumer)
A B2C website is a platform where a business sells products or services directly to individual consumers.
- Examples: 
Amazon
Flipkart
Netflix
Zmato / Swiggy
-Key Characteristics
Single-item purchases
Easy checkout
Focus on user experience and emotions
Fast delivery and customer service
👉 A B2C website sells directly to normal customers for personal use.
}
```
11. Solve the Problems (previous )
{
- Routing, Nested Route, nested layout, page.ts, layout.ts, dynamic route, dynamic route segment- catch all segments
- API route, App Route, Home page and Protected Page
- breadcrums
- responsive and fixed the position of product list and filter product
- modify the detail page
- sortby
- logic in filter, if no product will match, UI does not collapse
- login 
}
12. In Next.js (App Router), you can navigate in 6 main ways.
```{
    1. <LINK> Component : (Recommended for UI Navigation)
    - Best for buttons, menus, navbar links
    - import Link from "next/link";
    - <Link href="/dashboard">Go to Dashboard</Link>

    2. router.push() : (Programmatic Navigation)
    - Used inside client components.
    - Used when: after login/signup, after form submit, navigate on button click
    - "use client";
    - import { useRouter } from "next/navigation";
    - const router = useRouter();
    - router.push("/login");

    3. router.replace() : 
    - Same as push, but does NOT keep previous page in history.
    - Use cases: After logout, After forced redirects, Prevent back button abuse
    - router.replace("/login");

    4. router.back() 
    - Go to the previous page.
    - router.back();

    5. <Redirect> : (Using Server Component)
    - Use cases: Protected routes, Middleware replacements
    - import { redirect } from "next/navigation";
    - redirect("/login");

    6. Navigation with middleware.ts
    - Automatically redirect based on token or conditions.
    - Use cases: Force login before Home page, Admin route protection 
    - import { NextResponse } from "next/server";
    - export function middleware(request) {
    - const token = request.cookies.get("token")?.value;
    - if (!token) {
    - return NextResponse.redirect(new URL("/login", request.url));}}

    ## BONUS — Optional Ways to navigate

    7. Refresh the current route (server components).
     - router.refresh() 
   
    8. Search Params Navigation (Query Params)
    - router.push("/products?category=shoes");

    9. Dynamic Route Navigation
    - router.push(`/product/${id}`);
}
```
13.  Comparision amongs navigation methods
```
{
    | Method             | Where?        | Purpose                       |
| ------------------ | ------------- | ----------------------------- |
| `<Link>`           | UI navigation | best for normal links         |
| `router.push()`    | client        | programmatic                  |
| `router.replace()` | client        | redirect without back history |
| `router.back()`    | client        | go backward                   |
| `redirect()`       | server        | force redirect                |
| `middleware`       | global        | Auth protection               |

}
```
14. Route vs Router (Interview Table):
- A route is a specific path (URL), and a router is the system that manages and directs those routes.
```
{
Feature     	 Route	                                     Router
Meaning  	  A path/URL	                             Tool that manages routes
Does	   Defines what happens on a specific URL	     Chooses which code runs for a route
Example 	 /login	                                     BrowserRouter, express.Router
Handles	     Single URL	                                  Collection of routes
}
```
15. types of routes
```
{
| Type            | Description          | Example               |
| --------------- | -------------------- | --------------------- |
| Page Route      | UI pages             | `/login`              |
| API Route       | Backend logic        | `/api/login`          |
| Dynamic Route   | Path with parameter  | `/users/:id`          |
| Nested Route    | Routes inside routes | `/dashboard/settings` |
| Public Route    | Open to all          | `/signup`             |
| Protected Route | Login required       | `/dashboard`          |
}
```
16. types of Routers
```
{
    | Router Type        | Where Used      | Example               
| ------------------ | --------------- | --------------------- |
| BrowserRouter      | React frontend  | SPA apps              |
| Next.js App Router | Next.js         | File-based routing    |
| HashRouter         | React           | Static hosting        |
| Express Router     | Node.js backend | REST APIs             |
| Fastify Router     | Backend         | High-performance APIs |
| Hono Router        | Edge functions  | Cloudflare            |

}
```
17. 

18. How many way to store the data in client side and Server side
# Client Side:
```
{
| Storage           | Survives Refresh? | Survives Close? | Secure?      | Best Use         |
| ----------------- | ----------------- | --------------- | ------------ | ---------------- |
| LocalStorage      | Yes               | Yes             | ❌            | JWT, cart, theme |
| SessionStorage    | Yes               | ❌ Removes       | ❌            | Payment session  |
| Cookies           | Yes               | Yes             | ✔ HTTP-Only  | Secure tokens    |
| IndexedDB         | Yes               | Yes             | ✔ Large data | Offline apps     |
| In-memory (React) | ❌ No              | ❌ No            | ✔            | Component state  |
}
```
# Server Side: 
```
{| Storage               | Use Case                                   |
| --------------------- | ------------------------------------------ |
| SQL DB                | E-commerce orders, payments, user accounts |
| NoSQL DB              | Flexible data, product catalog             |
| Server Memory         | Sessions, caching                          |
| Files / Cloud Storage | Images, documents                          |
| Cookies               | Authentication                             |
| ENV variables         | Secrets, credentials                       |
| Logs                  | Monitoring                                 |
}
```
19. # When to use LocalStorage
- LocalStorage is good for temporary or UI state:
✔ Cart items (temporary)
✔ Wishlist (if user is NOT logged in)
✔ Theme (light/dark)
✔ Filters
✔ Recently viewed products
- These are fine because they are not critical.
# When to use Database
- A database is required for real user and business data:
✔ Login / Signup
✔ Orders
✔ User profile
✔ Payments
✔ Inventory
✔ Product data
✔ Admin dashboard 
# 🟧 Real-World Example (Simple)
- Cart in LocalStorage
```
{This is ok because:
It’s just temporary until checkout
Easy to store small items
Doesn’t need to be saved forever}
```
- Order in Database
```
{This must be permanent because:
User needs order history
Delivery partner needs details
Admin must see order
Payment needs record}
```
20. #  Difference between Backend and Database
```
{
| Feature                  | Backend           | Database          |
| ------------------------ | ----------------- | ----------------- |
| Stores data permanently? | ❌ No              | ✅ Yes             |
| Executes logic?          | ✅ Yes             | ❌ No              |
| Talks to client?         | ✅ Yes             | ❌ No              |
| Requires programming?    | Yes               | No (only queries) |
| Accessed via?            | HTTP API          | Database driver   |
| Example                  | Next.js API Route | MongoDB           |
}
```
21. # Difference amongs Local Storage , Backend and Database
```
{| Feature                   | Local Storage         | Backend        | Database     |
| ------------------------- | --------------------- | -------------- | ------------ |
| Stores permanent data?    | ❌ No                  | ❌ No           | ✅ Yes        |
| Lost after clearing data? | ❌ Yes                 | ❌ No           | ❌ No         |
| Device-independent?       | ❌ No                  | ❌ No           | ✅ Yes        |
| Good for?                 | Cart, theme, wishlist | Business logic | Real storage |
| Needed for login?         | ❌ No                  | ❌ Yes          | ❌ Yes        |
| Needed for orders?        | ❌ No                  | ❌ Partial      | ✅ Yes        |
}
```
22. # Difference between Server and Backend
```
{
    | Feature        | Server                      | Backend                        |
| -------------- | --------------------------- | ------------------------------ |
| What it is     | A machine/computer          | Code + logic running on server |
| Who manages it | Cloud provider (AWS/Vercel) | Developer                      |
| Includes       | CPU, RAM, OS                | APIs, Authentication, DB calls |
| Example        | AWS EC2                     | Node.js/Express API            |
}
```
23. # Full Architecture
```
   {        ┌──────────────────────────┐
           │        CLIENT            │
           │  (React, Next.js UI)     │
           └────────────┬─────────────┘
                        |
                        | HTTP Request (fetch/axios)
                        v
            ┌─────────────────────────┐
            │          API            │
            │ (/api/... endpoints)    │
            └────────────┬────────────┘
                        |
                        v
            ┌─────────────────────────┐
            │        BACKEND          │
            │ Business Logic, Auth    │
            │ Controllers, Services   │
            └────────────┬────────────┘
                        |
                        | DB Query
                        v
            ┌─────────────────────────┐
            │        DATABASE         │
            │  MongoDB, MySQL, etc    │
            └────────────┬────────────┘
                        |
                        | Hosted On Cloud
                        v
           ┌──────────────────────────┐
           │         CLOUD            │
           │ Vercel, AWS, Mongo Atlas │
           └──────────────────────────┘
}
```
24. # API
- In web development: An API is a URL endpoint where the frontend sends a request to the backend to ask for data or actions.
- eg. GET https://amazon.com/api/products
- Frontend asks →"Give me list of products. | "Backend replies →" Here are the products."
- An API Route is a specific URL in your backend that performs some task.
- For example, in Next.js: app/api/login/route.ts => This is an API route that handles login.
- Routes are classified by method: GET, POST

25. #  How we write HTTP request in code
```
{
- Frontend (React)

    fetch("/api/login", {
  method: "POST",
  body: JSON.stringify({ email, password })
})

 - API Route (Next.js)

 export async function POST(req) {
  const { email, password } = await req.json();
  return NextResponse.json({ message: "OK" });
}
}
```
26. # HTTP Request–Response Cycle Diagram
```
{
STEP 1: Browser creates an HTTP Request
-----------------------------------------
URL: /api/login
Method: POST
Headers: Content-Type: application/json
Body: { email, password }

STEP 2: Request sent to the Server
-----------------------------------------
Frontend --> Internet --> Server (Backend)

STEP 3: Backend processes the request
-----------------------------------------
- Validates user
- Talks to Database
- Generates token

STEP 4: Server sends HTTP Response
-----------------------------------------
Status: 200
Headers: Content-Type: application/json
Body: { "message": "Login success" }

STEP 5: Frontend receives response
-----------------------------------------
Frontend updates UI
}
```
27. # HTTP Request/Response
- HTTP Request → what frontend sends
- Contains:
✔ Method
✔ Headers
✔ URL
✔ Body
- HTTP Response → what backend returns
- Contains:
✔ Status Code
✔ Headers
✔ Data (JSON, HTML, file, etc.)
28. # Example of Full Response (API)
``` 
{
    HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-cache

{
  "productId": 5,
  "name": "iPhone 14",
  "price": 799
}
}
```
29. # How Frontend Handles the Response
```
{
    const res = await fetch("/api/login");
const data = await res.json();

if (res.status === 200) {
    console.log("Login success:", data);
} else {
    console.log("Error:", data.message);
}

}
```
- The frontend decides what to do depending on: success or failure, what data was returned, response code

30. 


31. when I click on <LINK> , It do empty the cart stored items but does not effect with useRouter(). | Why <Link> clears your cart but router.push() does not? ✔
- <Link> navigation = full component remount → state becomes empty
- router.push() navigation = soft navigation → state preserved
- Reason #1: Cart state stored in React state only (NOT localStorage).
```
{
If your cart is stored like this: const [cartItems, setCartItems] = useState([]);
Then when you click <Link>, Next.js unmounts the component → all React state resets. But localStorage NEVER resets.
So <Link> → component reloads → state resets to []
router.push() → sometimes the component does NOT fully unmount (Client Transition), so your state does NOT reset.
}
```
32. # Local Storage 👍   |( Wishlist / Favorites)
- A small place in the browser where you can store data permanently.: Survives refresh, Survives tab close, Survives system restart, Data stays until you manually remove it.
- LocalStorage is:
✔ Persistent (survives refresh, new tabs, browser restart)
❌ Not in memory
❌ Not cleared until you clear it manually or remove the key
- problem 1: “Encountered two children with the same key 1 , Why duplicate items appear in cart? ✔
-    Reason 1 — Your addToCart function is pushing duplicates
-    Reason 2 — Your LocalStorage saved duplicates
-    Solution : Add index to key to ensure uniqueness: Use a combination key for no duplicate keys.
- problem 2 : Wrap Entire App, including Header, inside <CartProvider> ✔
-     Reason: header was not wraped inside <CartProvider>

- # Visual Comparison
```
{
    | Storage Type  | Lives Where? | Persists after refresh? | Persists across tabs? |
| ------------- | ------------ | ----------------------- | --------------------- |
| React Context | Browser RAM  | ❌ No                    | ❌ No                  |
| useState      | Browser RAM  | ❌ No                    | ❌ No                  |
| localStorage  | Hard drive   | ✔ Yes                   | ✔ Yes                 |
| cookies       | Hard drive   | ✔ Yes                   | ✔ Yes                 |
| database      | Server       | ✔ Yes                   | ✔ Yes                 |

}
```
33. 
# Client Side Contains :
{
    | Item              | Example                         |
| ----------------- | ------------------------------- |
| UI Rendering      | React Components                |
| Styling           | CSS, Tailwind                   |
| State Management  | React Hooks                     |
| Temporary storage | localStorage / sessionStorage   |
| Browser APIs      | window, document                |
| API calls         | fetch("/api/products")          |
| Frontend logic    | Pagination UI, Filters, Buttons |
}

# Server Side Contains :
{
    | Item               | Example                         |
| ------------------ | ------------------------------- |
| API Routes         | `/api/products`                 |
| Database code      | MongoDB, MySQL                  |
| Authentication     | JWT, cookies                    |
| Backend validation | email, password                 |
| Business logic     | Cart calculation                |
| Data fetching      | Fetch products                  |
| Pagination logic   | `/api/products?page=3&limit=10` |
}



