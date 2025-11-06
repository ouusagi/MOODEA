import { useEffect, useState } from "react"
import App from "../../App"
import supabase from "../../supabaseClient"
import './Cart.css'

function Cart(){

  let [cart,setcart] = useState([])

  useEffect(()=>{
    async function Getitems() {
      const {data : userData, error : userError} = await supabase.auth.getUser()
      if(userError){
        console.log(userError.message)
        return
      }

      const {data : cartData, error : cartError} = await supabase
      .from("Cart")
      .select("*")
      .eq("user_id",userData.user.id)

      if(cartError){
        console.log("에러가 발생하였습니다.")
        return
      }
      else{
        setcart(cartData)
      }

    }
    Getitems()
  },[])


        async function minus(item) {
        if(item.quantity <= 1) return
        await supabase.from("Cart")
        .update({quantity: item.quantity - 1})
        .eq('id',item.id)

        setcart(prev => prev.map(i =>
          i.id === item.id ? {...i, quantity:i.quantity - 1} : i
        ))
      }

        async function plus(item) {
          await supabase.from("Cart")
          .update({quantity:item.quantity + 1})
          .eq("id",item.id)

          setcart(prev => prev.map(i =>
          i.id === item.id ? {...i, quantity:i.quantity + 1} : i
          ))
        }

        async function deleteitem(item) {
          await supabase.from("Cart")
          .delete()
          .eq("id",item.id)
          setcart(prev => prev.filter(i => i.id !== item.id))
        }



    return(
        <div>
        
        <div className="cart-container">

            <div className="cart-title-box">
                <p className="cart-title-p1">장바구니</p>
                <p className="cart-title-p2">{cart.length} items</p>
            </div>

            <div className="cart-body">

              <div className="cart-item-list-container">
                   <div className="cart-item-list-title">
                      <div className="cart-item-col">상품정보</div>
                      <div className="cart-item-col">가격</div>
                      <div className="cart-item-col">수량</div>
                      <div className="cart-item-col">총금액</div>
                      <div className="cart-item-col">취소</div>
                   </div>

                   {cart.length === 0 ? (<p className="none-cart">장바구니에 담긴 상품이 없습니다.</p>) : (
                   cart.map((item)=>{
                    return(
                    <div className="cart-item-list-box" key={item.id}>
                      <div className="cart-item-list-info">
                        <div className="cart-item">
                            <img src={item.photo} alt="product-img" />
                            <div className="cart-item-name">
                            <h3>{item.name}</h3>
                            <h5>{item.brand}</h5>
                            </div>
                        </div>

                        <div className="cart-item">{item.price.toLocaleString()}원</div>
                        <div className="cart-item">
                            <button onClick={()=> minus(item)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={()=> plus(item)}>+</button>
                        </div>
                        <div className="cart-item">{(item.price * item.quantity).toLocaleString()}원</div>
                        <div className="cart-item remove-btn" onClick={()=> deleteitem(item)}>
                        <i class="fa-solid fa-xmark"></i>
                        </div>
                      </div>
                   </div>
                   )})  
                   )}      

              </div>

              <div className="cart-total-modal">
                <p>최종 결제 금액</p>
                <hr />
                <p>주문금액 : 108,000원</p>
                <p>할인금액 : 0원</p>
                <p>상품 총 개수 : {cart.length}개</p>
                <p>배송비 : 무료</p>
                <h5>(5만원 이상 주문시 배송비 무료)</h5>
                <hr />
                <p>총 금액 : 108,000원</p>
                <p>적립 예정 포인트 : 1000p</p>
                <button>결제하기</button>
              </div>

            </div>


        </div>

        </div>
    )
}
export default Cart