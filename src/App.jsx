import { useState } from 'react'
import './MainPage_components/MainPage.css'
import AdPopup from './MainPage_components/AdPopup'
import TopMenu from './MainPage_components/TopMenu'
import HeaderSection from './MainPage_components/HeaderSection'
import CarouselSlider from './MainPage_components/CarouselSlider'
import CategoryBar from './MainPage_components/CategoryBar'
import NewProductList from './MainPage_components/NewProductList'
import Bestseller from './MainPage_components/Bestseller'
import GiftSet from './MainPage_components/GiftSet'
import Video from './MainPage_components/Video'
import Review from './MainPage_components/Review'

function App() {
  

  return (
    <div className='App'>

    <AdPopup />

    <TopMenu />

    <HeaderSection />

    <CarouselSlider />

    <CategoryBar />

    <NewProductList />

    <Bestseller />

    <GiftSet />

    <Video />

    <Review />

    </div>
  )
}

export default App
