import React from 'react'
import CategoriesSidebar from '../components/CategoriesSidebar'
import ProductList from '../components/ProductList'

const Categories = () => {
  return (
    <div className='flex  gap-5 '>
      <CategoriesSidebar/>
      <ProductList/>
    </div>
  )
}

export default Categories