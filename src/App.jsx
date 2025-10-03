import { Routes, Route, Navigate } from 'react-router-dom';

// pages
import {
  MainPage,
  SkincarePage,
  CleansingPage,
  MakeupPage,
  HaircarePage,
  BodycarePage
} from './pages';

// common components
import AdPopup from './components/common/AdPopup'
import HeaderSection from './components/common/HeaderSection';
import Footer from './components/common/Footer';
import TopMenu from './components/common/TopMenu';


// css
import './components/common/HeaderFooter.css'



function App() {
  return (
    <div className="App">

      <AdPopup/>
      <TopMenu/>
      <HeaderSection />
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/skincare" element={<Navigate to="/skincare/1" />} />
        <Route path="/skincare/:page" element={<SkincarePage />} />
        
        <Route path="/cleansing" element={<Navigate to="/cleansing/1"/>} />
        <Route path="/cleansing/:page" element={<CleansingPage />} />

        <Route path="/makeup" element={<Navigate to="/makeup/1"/>} />
        <Route path="/makeup/:page" element={<MakeupPage />} />

        <Route path="/haircare" element={<Navigate to="/haircare/1"/>} />
        <Route path="/haircare/:page" element={<HaircarePage/>} />

        <Route path="/bodycare" element={<BodycarePage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
