import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
  MaskpackPage,
  GiftsetPage
} from './pages';

// ProductDetaill
import { 
  NewproductListDetail,
  BestSellerDetail
} from './pages/Detail';


// Recycling Product Detail Pages
import BestProductDetailPage from './components/Recycling/BestProductDetailPage';
import ProductDetailPage from './components/Recycling/ProductDetailPage';
import GiftsetProductDetailPage from './components/Recycling/GiftsetProductDetailPage';

// Login Page & Signup Page
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';

// My Page
import Mypage from './pages/Mypage/Mypage';

// Cart
import Cart from './pages/Cart/Cart';

// Wishlist
import Wishlist from './pages/Wishlist/Wishlist';

// Payments
import Success from './pages/Payments/Success';
import Fail from './pages/Payments/Fail';

// OrderList
import OrderList from './pages/OrderList/OrderList';

// HelpCenterPage
import HelpCenterPage from './pages/HelpCenterPage/HelpCenterPage';

// ReviewBoard
import ReviewBoard from './pages/ReviewBoard/ReviewBoard';
import ReviewPost from './pages/ReviewBoard/ReviewPost';
import ReviewDetail from './pages/ReviewBoard/ReviewDetail';
import ReviewEdit from './pages/ReviewBoard/ReviewEdit';

// common components
import AdPopup from './components/common/AdPopup'
import HeaderSection from './components/common/HeaderSection';
import Footer from './components/common/Footer';
import TopMenu from './components/common/TopMenu';


// css
import './components/common/HeaderFooter.css'






function App() {

  const location = useLocation();
  let isLoginPage = location.pathname === '/login'
  let isSignupPage = location.pathname === '/signup'


  return (
    <div className="App">

      
      {!isSignupPage && !isLoginPage &&(
        <>
       <AdPopup/>
       <TopMenu/>
       <HeaderSection />
       <ScrollToTop/>
       </>
      )}
      

      <Routes>

        <Route path="/" element={<MainPage />} />

        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/wishlist" element={<Wishlist/>}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/payment/success" element={<Success/>}></Route>
        <Route path="/payment/fail" element={<Fail/>}></Route>
        <Route path='/orderlist' element={<Navigate to={"/orderlist/1"}/>}></Route>
        <Route path='/orderlist/:page' element={<OrderList/>}></Route>
        <Route path="/helpcenter" element={<Navigate to={"/helpcenter/1"} />}></Route>
        <Route path="/helpcenter/:page" element={<HelpCenterPage />}></Route>
        <Route path="/reviewboard" element={<Navigate to={"/reviewboard/1"} />}></Route>
        <Route path="/reviewboard/:page" element={<ReviewBoard />}></Route>
        <Route path="/reviewpost" element={<ReviewPost />}></Route>
        <Route path='/reviewdetail/:reviewId' element={<ReviewDetail />}></Route>
        <Route path='/reviewedit/:reviewId' element={<ReviewEdit/>}></Route>

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

        <Route path="/giftset" element={<Navigate to="/giftset/1"></Navigate>} />
        <Route path="/giftset/:page" element={<GiftsetPage />} />

        <Route path="/newproduct/:id" element={<NewproductListDetail />}></Route>
        <Route path="/bestseller/:id" element={<BestSellerDetail />}></Route>
        <Route path="/product/:category/:id" element={<ProductDetailPage />}></Route>
        <Route path="/bestproduct/:category/:id" element={<BestProductDetailPage />}></Route>
        <Route path="/giftsetproduct/:category/:id" element={<GiftsetProductDetailPage />}></Route>
      </Routes>

      {!isSignupPage && !isLoginPage && <Footer />}
      
    </div>
  );
}

export default App;
