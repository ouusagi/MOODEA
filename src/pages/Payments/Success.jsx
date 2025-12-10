import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import App from "../../App"
import supabase from "../../supabaseClient"
import './Payments.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';


function Success(){

    const [searchparams] = useSearchParams()
    const orderId = searchparams.get("orderId")
    const paymentKey = searchparams.get("paymentKey")
    const amount = searchparams.get("amount")
    const [orderedItems, setOrderedItems] = useState([])
    let [Swiperitems,setSwiperitems] = useState([])
    let navigate = useNavigate()

useEffect(() => {
        if (!orderId) return;

        const storedData = window.sessionStorage.getItem(orderId);
        if (storedData) {
            const parsedItems = JSON.parse(storedData);
            setOrderedItems(parsedItems);
        }
    }, [orderId])
    
    useEffect(()=>{
        async function SaveOrder() {
            if (orderedItems.length === 0) return;
            const {data:userdata} = await supabase.auth.getUser()
            const user_id = userdata.user.id;
            const {data:userToken} = await supabase.auth.getSession()
            const session = userToken.session.access_token

            if(!session){console.error('사용자 세션을 찾을 수 없어 결제 검증을 진행할 수 없습니다.'); navigate('/payment/fail?code=AUTH_ERROR'); return;}

            const orderVerificationData = {user_id,orderId,paymentKey,amount:Number(amount),items:orderedItems}

            try{
            const res = await fetch('https://boganzpcciscvqjmsdwi.supabase.co/functions/v1/save-order',
                {
                    method:'POST',
                    headers: {'Content-Type' : "application/json",
                              'Authorization': `Bearer ${session}`
                             },
                    body: JSON.stringify(orderVerificationData)
                }
            )
            const resdata = await res.json()

            if(!res.ok){console.error("서버 검증 실패", resdata); navigate(`/payment/fail?message=${resdata.error || '결제 검증 중 오류가 발생했습니다.'}`); return;}

            console.log("응답 :",resdata)
            window.sessionStorage.removeItem(orderId)
            }

            catch(err){
            console.log("Fetch 또는 서버 통신 오류 :", err);
            navigate("/payment/fail?code=NETWORK_ERROR");
            }

        }
            if(orderId && paymentKey && amount){
               SaveOrder()
            }

    },[orderId, paymentKey, amount, orderedItems])

    useEffect(()=>{
        async function Getproduct() {
            const {data:itemData, error:errorData} = await supabase
            .from('ProductsDB')
            .select('photo')
            .limit(9)

            if(errorData){console.log(errorData.message);return;}
            setSwiperitems(itemData.sort(()=> Math.random() - 0.5))
        }
        Getproduct()
    },[])


    return(
        <div>
            <div className="Success-container">

                <div className="Success-title">
                    <p className="Success-text-1">결제가 완료되었습니다 !</p>
                    <p className="Success-text-2">“배송사 사정에 따라 3~4일 소요될 수 있습니다”</p>
                </div>

                <div className="recommended-products">

                    <div className="recommended-title">
                    <p className="recommended-text-1">Recommendation</p>
                    <p className="recommended-text-2">"고객님이 선호하실만한 상품"</p>
                    </div>

                <Swiper
                    initialSlide={4}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={6}
                    coverflowEffect={{
                    rotate: 40,
                    stretch: 0,
                    depth: 120,
                    modifier: 1,
                    slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="Effect-coverflow-Swiper"
                    slideToClickedSlide={true}
                    >
                        
                    {Swiperitems.map((item,id)=>(
                    <SwiperSlide key={id}>
                    <img onClick={()=>{navigate('/skincare')}} src={item.photo} alt="product-img"/>
                    </SwiperSlide>
                    ))}
                </Swiper>

                <div className="select-btn">
                    <button className="select-btn-0" onClick={()=>{navigate('/')}}>메인으로</button>
                    <button className="select-btn-0" onClick={()=>{navigate('/skincare')}}>상품 더보기</button>
                </div>

                </div>
            </div>
        </div>
    )
}
export default Success