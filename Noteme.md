1. sign/signup ---> logout ----> < data : stored in my website > |  signin ---> utilized the stored data, then works as logged.
2. Goal : SignIn and SignUp
- User must see Signup page first
- After signup → redirect to Main Page
- Main Page should only open if user is logged in
- Logout → clear session → go to Login page

3. Theme :  system mode, dark mode, light mode , Please explain me how to add into my project.
- Theme to persist after refresh, update instantly, respect system changes automatically and Tailwind CSS support.
- enable mode in tailwindCSS
 
# Problem: 1
- Qn. In Next.js (App Router), How many way to navigate?  ✔
- check the detail page (Here, we only show the detail Page and suggest similar items) | Cart data Flow  ✔
- Problem 1: When I click add to card on detailProduct page , it goes to cart Page and also show in the checkout Page? ✔
- Problem 2: When I click buy now on detailProduct Page, It directlty navigate to the checkout Page with existed add to cart Product. ✔
- Problem 3: Where, How can I put Login Page, Sign Up page , Logout?
- problem 4: if carditems already exist in your cart, then don't navigate to the cart page if i do add to cart on existing items, It only show the
         pop-up(Cart already added) & also do same with detail page and make sure this change does not effect on +/- items in your cart page. ✔
- Problem 5: check other website , How Cart Page look like? | add place order on your cartPage. ✔
- Problem 6: Create a pop up / modal / dialog box. ✔
- Problem 7: when I select the cart and copy the url ---> paste in new tab that works (Use React Context + Local Storage). ✔
1. make the products in grid and list = Toggle
2. see the other website, how and where I put checkout Page ✔
- use the Suspense (Loader or fallback Skelton), when I select the filter , show there is fallback in the Product grid.
- SignIn and Signup = use Local Storage, middleware
- api route (login/signup) = replace "any" keyword with datatype.

# Problems: 2
- pagination fix : when we open a product at page no. 4 (paginate no. 4) ---> now, we at detail page --> fix whem we go back, the browser open at paginate no. 4 , not go at page no.1 and 
- buynow
- cartPage --> click on productcart open in new tab and add to cart button deleted and show buy now --> click --> checkoutPage
- language --> Arabic, English, French, Spanish, Hindi
- theme (icon show) ---> Mode: dark, light, system


# You’re trying to add a conditional Tailwind class, but because the condition only runs on the client, your server and client HTML don't match, causing a hydration error.

# Solving Problems:🚀 
1. fix the Pagination problems:
# Pagination
- Pagination is the process of breaking large datasets into smaller pages so the UI loads faster and the user does not have to load all items at once.
- Why Pagination? : Reduces API load, Improves performance, Saves bandwidth, Better user experience
- bandwidth : Bandwidth means the amount of data transferred between your device and the server.
- [Bandwidth] is the maximum amount of data that can be transmitted over a network connection in a given amount of time, typically measured in bits per second (bps).
- It determines the speed and efficiency of data transfer, such as how quickly you can download files or stream videos. Higher bandwidth allows more data to be  transmitted simultaneously, resulting in a faster connection.
- [Save_Bandwidth] means to use your internet connection's data capacity more efficiently, reducing the amount of data transferred without significantly 
   harming performance, allowing for faster speeds, smoother streaming/gaming, and preventing slowdowns.
- saves bandwidth => The server sends less data, Your browser loads less data, The network load becomes small, The website becomes faster.
- Bandwidth is the maximum data transfer rate, not the actual speed you always get. Your actual speed can be affected by other factors like network congestion.
- [Network_congestion] reduces available bandwidth because more data is trying to travel through the network than its capacity can handle, similar to a traffic jam on a highway. This competition for limited bandwidth leads to slower speeds, increased latency, dropped packets, and a degraded overall user experience.
# Pagination Workflow
- The UI (Client): User clicks url --> Backend Receives Query Params: Backend calculates --> Backend Returns Paginated Response --> Client Renders Pagination UI --> User Navigates.
# How to Add Pagination (two way)
- 1. Server-Side Pagination (Recommended for SEO): Using Route Handlers + fetch + searchParams 
- /app/api/products/route.ts :  Eg- Example backend API
- /app/products/page.tsx (Server Component)
- How This Works: Server Component reads query params --> Data fetched on server --> Pagination buttons just change URL
- 2. Client Side Pagination (CSR) Using useEffect : Good for dashboards/private pages
# bugs: 
- when we open a product at page no. 4 (paginate no. 4) ---> now, we at detail page --> fix whem we go back, the browser
  open at paginate no. 4 ,not go at page no.1.
- 


