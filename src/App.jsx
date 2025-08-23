import { useState } from 'react'
import './MainPage_components/MainPage.css'
import AdPopup from './MainPage_components/AdPopup'
import TopMenu from './MainPage_components/TopMenu'
import HeaderSection from './MainPage_components/HeaderSection'
import CarouselSlider from './MainPage_components/CarouselSlider'
import CategoryBar from './MainPage_components/CategoryBar'
import NewProductsSection from './MainPage_components/NewProductsSection'
import NewProductList from './MainPage_components/NewProductList'

function App() {
  

  return (
    <div className='App'>

    <AdPopup />

    <TopMenu />

    <HeaderSection />

    <CarouselSlider />

    <CategoryBar />

    <NewProductsSection />

    <NewProductList />

    </div>
  )
}

export default App
