import { useEffect, useState } from "react"
import App from "../../App"
import supabase from "../../supabaseClient"
import './Cart.css'

function Cart(){

  let [point,setpoint] = useState(0)
  let [inputpoint,setinputpoint] = useState('')
  let [coupon,setcoupon] = useState([])
  let [cart,setcart] = useState([])
  let [showModal,setShowModal] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [CouponDiscount, setCouponDiscount] = useState(0)
  const [discount,setdiscount] = useState(0)
  const total = cart.reduce((sum,item)=>{return sum + item.quantity * item.price},0)
  const shipping = total >= 50000 ? 0 : 3000
  const earnpoint = Math.floor(total / 1000) * 10

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

      const {data:UserPoint, error:UserError} = await supabase.from("users")
      .select("point")
      .eq("id",userData.user.id)
      .single()

      if(UserError){console.log(UserError.message)}
      else{setpoint(UserPoint.point)}


      const {data:UserCoupon, error:CouponError} = await supabase.from("user_coupons")
      .select("*")
      .eq("user_id",userData.user.id)
      if(CouponError){console.log(CouponError.message)}
      else{setcoupon(UserCoupon)}
      if(UserCoupon.length > 0){setSelectedCoupon(UserCoupon[0])}

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


        function useAllPoints(){
          setinputpoint(point)
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
                        <i className="fa-solid fa-xmark"></i>
                        </div>
                      </div>
                   </div>
                   )})  
                   )}      

              </div>

              <div className="cart-total-modal">
                <p>최종 결제 금액</p>
                <hr />
                <p>주문금액 : {total.toLocaleString()}원</p>
                <p>할인금액 : {(discount + CouponDiscount).toLocaleString()}원</p>
                <p>상품 총 개수 : {cart.reduce((sum,item)=>{return sum + item.quantity},0)}개</p>
                <p>배송비 : {shipping.toLocaleString()}원</p>
                <h5>(5만원 이상 주문시 배송비 무료)</h5>
                <hr />
                <p>총 금액 : {(total - discount - CouponDiscount + shipping).toLocaleString()}원</p>
                <p>적립 예정 포인트 : {earnpoint}p</p>
                <button onClick={()=> {if(cart.length === 0){return alert("장바구니에 담긴 상품이 없습니다.")}}}>결제하기</button>
                <button onClick={()=> {if(cart.length === 0){return alert("장바구니에 담긴 상품이 없습니다.")}
              else{setShowModal(true)}}}>쿠폰/포인트 사용</button>
              </div>

            </div>


        </div>


              {showModal && (
        <div className="modal-overlay">
          <div className="coupon-modal">
            <h3>쿠폰/포인트 사용</h3>
            <div className="point_coupon_box">
            <p>보유 포인트: {point}p</p>
            <p>보유 쿠폰: {coupon.length}개</p>
            </div>

            <div className="coupon-input-box">
              <label>보유 쿠폰 사용</label>
              <select value={selectedCoupon?.coupon_name || ""} onChange={(e)=> {const selected = coupon.find(c => c.coupon_name === e.target.value); 
              setSelectedCoupon(selected)}}>{coupon.map((item,i)=>{
              return <option key={i}>{item.coupon_name}</option>
              })}</select>
              <button onClick={()=>{if(!selectedCoupon){return alert("쿠폰을 선택 해주세요.")}else{alert("쿠폰이 적용 되었습니다 !"); setCouponDiscount(selectedCoupon.amount)}}}>적용</button>
            </div>

            <div className="point-input-box">
              <label>사용할 포인트</label>
              <div>
              <input type="text" placeholder="0" value={inputpoint} min={0} max={point} 
              onChange={(e)=>{if(/^\d*$/.test(e.target.value)){setinputpoint(e.target.value)}}}/>
              </div>
              <button onClick={(e)=>{if(Number(inputpoint) > point){alert("보유한 포인트가 부족합니다.")}
              else if(!inputpoint || Number(inputpoint) === 0){alert("포인트를 입력해주세요.")}
            else{alert("포인트가 적용 되었습니다 !"); setdiscount(Number(inputpoint))}}}>적용</button>
              <button onClick={useAllPoints}>전체사용</button>
            </div>

            <button className="close-btn" onClick={()=> setShowModal(false)}>닫기</button>
          </div>
        </div>
      )}

        </div>
    )
}
export default Cart