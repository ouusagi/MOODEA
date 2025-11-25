import { useEffect, useState } from "react"
import App from "../../App"
import supabase from "../../supabaseClient"
import './Wishlist.css'

function Wishlist(){

    let [userId,setuserId] = useState(null)
    let [product,setproduct] = useState([])
    


    useEffect(()=>{
        async function GetUsers() {
            const {data:sessionData, error:sessionError} = await supabase.auth.getSession()

            if(sessionError){
                console.log(sessionError.message); 
                alert("유저 정보를 불러오는 도중 에러가 발생하였습니다."); 
                return;
            }

            if(!sessionData?.session?.user?.id){alert("로그인이 필요한 서비스 입니다."); return;}

            setuserId(sessionData?.session?.user?.id || null)
            
            const {data:WishItem, error:WishError} = await supabase
            .from("Wishlist")
            .select("*")
            .eq("user_id",sessionData?.session?.user?.id)

            if(WishError){console.log(WishError.message); return;}
            else{setproduct(WishItem)}
            
        }
        GetUsers()
    },[])

    async function InCart(item) {
        const {data:CartItem, error:CartError} = await supabase
        .from('Cart')
        .select('*')
        .eq('product_id', item.product_id)
        .eq('user_id', userId)
        .maybeSingle()

        if(CartItem){alert('이미 장바구니에 담겨있는 제품입니다.'); console.log(CartError.message); return}
        if(CartError){alert('에러가 발생하였습니다.'); console.log(CartError.message); return}

        else{
            const {error:InsertItemError} = await supabase.from('Cart')
            .insert({
                user_id:userId,
                product_id:item.product_id,
                quantity:1,
                photo:item.photo,
                price:item.price,
                name:item.name,
                brand:item.brand
            })
             if(InsertItemError){alert("에러가 발생하였습니다"); console.log(InsertItemError.message); return}
             alert("장바구니에 담겼습니다 ! 🛒")
        }
    }

    async function DeleteItem(item) {
        await supabase
        .from('Wishlist')
        .delete()
        .eq('id',item.id)
        setproduct(prev=> prev.filter(i => i.id !== item.id))
    }


    return(
        <div>
        
        <div className="Wishlist-container">

            <div className="Wishlist-title-box">
                <p className="Wishlist-title-p1">위시리스트</p>
                <p className="Wishlist-title-p2">{product.length} items</p>
            </div>
            
            
            <div className="Wishlist-banner-container">
                <div><p>상품명</p></div>
                <div><p>상품가격</p></div>
                <div><p>담기</p></div>
                <div><p>제거</p></div>
            </div>

            <div className="Wishlist-item-container">

                { product.length > 0 ? (
                    product.map((item,i)=>{
                        return(
                <div className="Wishlist-item-box" key={i}>

                <div className="Wishlist-item-img">
                    <img src={item.photo}/>
                    <div>
                    <p>{item.name}</p>
                    <h3>{item.brand}</h3>
                    </div>
                </div>

                <div>
                    <p>{item.price.toLocaleString()}원</p>
                </div>

                <div>
                    <span><i className="fa-solid fa-cart-plus cart-box" onClick={()=>InCart(item)}></i></span>
                </div>

                <div>
                    <span><i className="fa-solid fa-xmark close-button" onClick={()=>DeleteItem(item)}></i></span>
                </div>
            </div>
                    )})
            
                ) : (<div className="not-item-msg"><p>찜한 상품이 없습니다.</p></div>)}

            </div>

        </div>
            
       
        </div>
    )
}
export default Wishlist