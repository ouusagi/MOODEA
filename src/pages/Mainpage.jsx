// components
import CarouselSlider from '../components/main/CarouselSlider';
import CategoryBar from '../components/main/CategoryBar';
import NewProductList from '../components/main/NewProductList';
import Bestseller from '../components/main/Bestseller';
import GiftSet from '../components/main/GiftSet';
import Video from '../components/main/Video';
import Review from '../components/main/Review';
import SocialMedia from '../components/main/SocialMedia';

// css
import '../components/main/MainPage.css';

function MainPage(){
    return(
        <div>
          <CarouselSlider />
          <CategoryBar />
          <NewProductList />
          <Bestseller />
          <GiftSet />
          <Video />
          <Review />
          <SocialMedia />
        </div>
    )
}

export default MainPage