import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from '../scrollToTop';

// pages
import {
  MainPage,
  SkincarePage,
  CleansingPage,
  MakeupPage,
  HaircarePage,
  BodycarePage,
  PerfumePage,
  SuncarePage,
  MaskpackPage
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
      <ScrollToTop/>
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

        <Route path="/bodycare" element={<Navigate to="/bodycare/1"></Navigate>} />
        <Route path="/bodycare/:page" element={<BodycarePage />} />

        <Route path="/perfume" element={<Navigate to="/perfume/1"></Navigate>} />
        <Route path="/perfume/:page" element={<PerfumePage />} />

        <Route path="/suncare" element={<Navigate to="/suncare/1"></Navigate>} />
        <Route path="/suncare/:page" element={<SuncarePage />} />

        <Route path="/maskpack" element={<Navigate to="/maskpack/1"></Navigate>} />
        <Route path="/maskpack/:page" element={<MaskpackPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
