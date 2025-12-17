import { useEffect, useState } from "react"
import App from "../../App"
import supabase from "../../supabaseClient"
import './OrderList.css'
import { addToCart } from "../../utils/cart"
import { useNavigate, useParams } from "react-router-dom"

function OrderList(){

    const navigate = useNavigate()
    const {page} = useParams()
    const nowpage = Number(page) || 1
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
        else{setOrderData(SearchData); navigate('/orderlist/1')}
    }

    async function CartItems(item) {
        if(!user){alert('로그인이 필요합니다.'); return;}
        addToCart(user, item)
    }


    const pageproductcount = 5 // 한 페이지 당 제품의 수
    const totalpage = Math.ceil(OrderData.length / pageproductcount) // 총 페이지 계산
    const sliceditem = OrderData.slice((nowpage - 1) * pageproductcount, pageproductcount * nowpage) // 페이지별 보여줄 제품



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
                    
                    {sliceditem.map((item,i)=>(
                <div className="OrderList-item-box" key={i}>
                    <p className="OrderList-item-box-title">구매완료  <h4>{item.created_at.slice(0,10)}</h4></p>

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
                    { nowpage !== 1 &&(
                <button onClick={()=>{if(nowpage > 1){navigate(`/orderlist/${nowpage - 1}`)}}} disabled={nowpage === 1} >이전</button>
                )}
                <p>- {nowpage} 페이지 -</p>
                { nowpage !== totalpage &&(
                <button onClick={()=>{if(nowpage < totalpage){navigate(`/orderlist/${nowpage + 1}`)}}} disabled={nowpage === totalpage}>다음</button>
                )}
                </div>

            </div>


        </div>

        </div>
    )
}
export default OrderList