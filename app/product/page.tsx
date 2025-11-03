import React from 'react'
import ProductsPage from './listProduct'
import SearchBar from './searchBar'

export default function page() {
  return (
    <div>
      <SearchBar />
      <ProductsPage />
    </div>
  )
}