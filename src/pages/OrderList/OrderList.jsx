import { useEffect, useState } from "react"
import App from "../../App"
import supabase from "../../supabaseClient"
import './OrderList.css'
import { addToCart } from "../../utils/cart"

function OrderList(){

    let [user,setuser] = useState(null)
    let [OrderData,setOrderData] = useState([])
    const [searchValue,setsearchValue] = useState('')

    useEffect(()=>{
        async function UserData() {
            const {data:userinfoData, error:userError} = await supabase.auth.getSession()
            if(userError){console.log(userError.message); alert('유저 정보가 없습니다. 다시 시도해주세요'); return;}
            else{setuser(userinfoData?.session?.user?.id || null)}
        }
        UserData()
    },[])

    useEffect(()=>{
        if(!user) return;

        async function fetchOrders() {
            const {data:fetchData, error:fetchError} = await supabase
            .from('Orders')
            .select('*')
            .order('created_at', {ascending: false})
            .eq('user_id',user)

            if(fetchError){console.log(fetchError.message); return;}
            else{setOrderData(fetchData)}
        }
        fetchOrders()
    },[user])

    async function SearchItems() {
        if(!user){console.log("로그인이 필요합니다."); return;}
        const {data:SearchData, error:SearchError} = await supabase
        .from("Orders")
        .select("*")
        .order("created_at", {ascending:false})
        .eq("user_id",user)
        .ilike("name",`%${searchValue}%`)

        if(SearchError){console.log(SearchError.message); return;}
        else{setOrderData(SearchData)}
    }

    async function CartItems(item) {
        if(!user){alert('로그인이 필요합니다.'); return;}
        addToCart(user, item)
    }


    return(
        <div>
        
        <div className="OrderList-container">

            <div className="OrderList-title-box">
                <p className="OrderList-title">주문목록 / 배송목록</p>
                <div className="OrderList-search">
                <input type="text" placeholder="주문한 상품 혹은 배송조회를 할 수 있어요 !" value={searchValue} 
                onChange={(e)=>{setsearchValue(e.target.value)}} onKeyDown={(e)=>{if(e.key === "Enter"){SearchItems()}}}/>
                <span><i className="fa-solid fa-magnifying-glass OrderList-search-icon" onClick={()=>{SearchItems()}}></i></span>
                </div>
            </div>

            <div className="OrderList-items-container">
                {OrderData.length === 0 && (<p className="OrderList-empty">주문한 상품이 없습니다.</p>)}
                    
                    {OrderData.map((item,i)=>(
                <div className="OrderList-item-box" key={i}>
                    <p className="OrderList-item-box-title">구매완료</p>

                    <div className="OrderList-item-info-box">
                    <img src={item.photo} alt="product-item-photo"/>
                    <div className="OrderList-item-info-box-text">
                    <p>{item.name}</p>
                    <p>{(item.price*item.quantity).toLocaleString()}원 - {item.quantity}개</p>
                    <p>{item.brand}</p>

                    <div className="OrderList-item-info-box-btn">
                    <button onClick={()=>{CartItems(item)}}>장바구니</button>
                    <button>리뷰작성</button>
                    </div>

                    </div>

                    <div className="OrderList-option-btn">
                        <button>배송현황</button>
                        <button>취소 / 반품</button>
                        <button>문의하기</button>
                    </div>

                    </div>

                </div>
                ))}

                <div className="OrderList-Pagination">
                <button>이전</button><button>다음</button>
                </div>

            </div>


        </div>

        </div>
    )
}
export default OrderList