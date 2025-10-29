# Products(Shopping) based project
  - Next.js + React.js + TypeScript
  - install next.js with Typescript
  - initialize, configure
  - run the App (npm run dev)

# Layout of the Project

- Header
     - Logo
     - Product (Button)
     - About
     - Features
     - Pricing
     - Shopping Cart (React Context / local storage / view  the stored products)

- Body / Main Page
     - Show your Product (Button)
     # Navigate to Products Page
        { 
             - scroll on filter side bar and products list
             - Responsive for All devices
             - Background color in Cards
             - Hovering on Card (highlight)
             - Search everything from searchBar below the Header
             - Tags (product type)
             - Horizontal scrolling of same type of products
             - Badge on some products (Higher Order Components)
             - Image in Cart look different
             - Pagination* (to the Products list)
             - sticky footer layout
             - if I click mutiple time it's just store one product in shopping cart and further product add or reduce according to the increment/decrement click.
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
                    
- Footer
    - Address
    - features
    - subscribe
    - email
    - follow us