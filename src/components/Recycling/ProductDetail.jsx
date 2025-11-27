import { useParams } from "react-router-dom";
import supabase from "../../supabaseClient";
import { useEffect, useState } from "react";
import '../Recycling/ProductDetail.css'
import { useNavigate } from "react-router-dom";
import { requestPayment } from "../../utils/payment";


function ProductDetail({ tableName, category }) {

    let [products,setproducts] = useState(null)
    let {id} = useParams()
    let [saveinfo, setsaveinfo] = useState(0)
    let [itemcount, setitemcount] = useState(1)
    let [btn,setbtn] = useState(false)
    let [showimg,setshowimg] = useState(["https://img.freepik.com/premium-psd/pipette-with-drop-cosmetic-oil-bottle_70626-12801.jpg?ga=GA1.1.358440641.1756050848&semt=ais_hybrid&w=740&q=80",
      "https://img.freepik.com/premium-psd/skin-care-packaging-design-mockup_23-2149426319.jpg?ga=GA1.1.358440641.1756050848&semt=ais_hybrid&w=740&q=80","https://img.freepik.com/premium-psd/cosmetic-tube-mockup-psd-with-patterned-glass-texture-product-backdrop_53876-145826.jpg?ga=GA1.1.358440641.1756050848&semt=ais_hybrid&w=740&q=80"
    ])
    let [showmd, setshowmd] = useState(false)
    let navigate = useNavigate()
    let [user, setuser] = useState(null)

    useEffect(()=>{
        async function fetchData() {
            const {data: getdata, error: notdata} = await supabase
            .from(tableName)
            .select('*')
            .order('id', {ascending: true})
            .eq('id', id)
            .eq('category', category)
            .maybeSingle()

        if(notdata){
            console.log(notdata.message)
        }
        else{
            setproducts(getdata)
        }

        const {data: UserData, error: UserError} = await supabase.auth.getUser()
        if(UserError){console.log(UserError.message)}
        else{setuser(UserData?.user ?? null)}
        }

        fetchData()
    },[id, category, tableName])

    if(!products) return <p>상품 정보를 불러오는 중 입니다..</p>


    async function addToCart() {
      const {data: inCart, error:errorCart} = await supabase  // 장바구니 중복확인
      .from("Cart")
      .select("*")
      .eq('user_id',user.id)
      .eq('product_id',products.id)
      .maybeSingle()

      if(inCart){   // 중복이면 상품 수량만 증가
        await supabase
        .from("Cart")
        .update({quantity:inCart.quantity + itemcount})
        .eq('id', inCart.id)
    }

    else{
      await supabase.from("Cart") //중복이 없으면 카트 테이블에 해당 상품 데이터 전송
      .insert({
        user_id:user.id,
        product_id:products.id,
        quantity:itemcount,
        price:products.price,
        name:products.name,
        photo:products.photo,
        brand:products.brand
      })
    }
    alert("장바구니에 담겼습니다 ! 🛒")
  }


  async function addToWishList() {
    const {data:itemData, error:itemError} = await supabase
    .from('Wishlist')
    .select('*')
    .eq('user_id',user.id)
    .eq('product_id',products.id)
    .maybeSingle()

    if(itemError){console.log(itemError.message); alert("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");return}
    if(itemData){alert("이미 위시리스트에 담겨 있습니다 ❤️"); return}
    else{
      const {error:insertError} = await supabase.from('Wishlist')
      .insert({
        user_id:user.id,
        product_id:products.id,
        price:products.price,
        name:products.name,
        photo:products.photo,
        brand:products.brand
      })
      if(insertError){alert("에러가 발생하였습니다."); console.log(insertError.message); return}
      alert("위시리스트에 담겼습니다 ❤️")
    }
  }

  async function handleBuyNow(){
    const paymentData = {
      orderId:`order-${Date.now()}`,
      amount:products.price * itemcount,
      orderName:products.name,
      customerName:user.Email
    }
    await requestPayment(paymentData)
  }

    function Modal() {
      
      return(
        <div className="modal-bg">
          <div className="modal-box">
          <p>"로그인 후 이용 가능합니다. <br /> 로그인 페이지로 이동하시겠습니까?"</p>
          <div className="modal-btn-container">
          <button onClick={()=> setshowmd(false)}>취소</button>
          <button onClick={()=> navigate("/login")}>확인</button>
          </div>
          </div>
        </div>
      )
    }


  return (
    <div className="bg">
    <div className="product-detail">
      <div className="product-detail-img">
        <img src={products.photo} alt="상품 이미지"/>
      </div>

      <div className="product-detail-info">
        <h2>{products.name}</h2>
        <h3>{products.brand}</h3>
        <p className="price">{products.price.toLocaleString()}원</p>
        <hr />
        <p className="delivery">배송비	2,500원 (50,000원 이상 구매 시 무료)</p>
        <p className="info">{products.info}</p>

        <div className="count-btn-container">
            <button onClick={()=>{
              if(itemcount > 1){
              setitemcount(prev=> prev - 1)
              }
            }}>-</button>
            <span>{itemcount}</span>
            <button onClick={()=>{
              setitemcount(prev=> prev + 1)
            }}>+</button>
            <h4>Total {(products.price * itemcount).toLocaleString()}원</h4>
        </div>


        {showmd && <Modal/>}
        

      <div className="product-detail-btn">
        <button onClick={()=>{if(!user){setshowmd(true)}else{handleBuyNow()}}}>BUY IT NOW</button>
        <button onClick={()=>{
          if(!user){setshowmd(true)}
          else{addToCart()}
          }}>CART</button>
        <button onClick={()=>{if(!user){setshowmd(true)}else{addToWishList()}}}><p>WISH LIST</p></button>
      </div>
      
      </div>

    </div>


        <div className="product-detail-box-info">
            <button className={saveinfo == 0 ? 'active' : ''} onClick={()=>{
              setsaveinfo(0)
            }}>상세정보</button>
            <button className={saveinfo == 1 ? 'active' : ''} onClick={()=>{
              setsaveinfo(1)
            }}>구매후기</button>
            <button className={saveinfo == 2 ? 'active' : ''} onClick={()=>{
              setsaveinfo(2)
            }}>반품/교환</button>
            <button className={saveinfo == 3 ? 'active' : ''} onClick={()=>{
              setsaveinfo(3)
            }}>Q&A</button>
        </div>

        <div className="product-detail-box-content">
          {saveinfo === 0 && <div><img src="https://img.freepik.com/premium-psd/skin-care-packaging-design-mockup_23-2149426344.jpg?ga=GA1.1.358440641.1756050848&semt=ais_hybrid&w=740&q=80" alt="상품 템플릿 사진" /> 
{!btn && (<button onClick={()=>{setbtn(true)}}>상품정보 더보기</button>)}
{btn && (showimg.map((img,i)=>{
 return <img key={i} src={img} alt="상품 템플릿 사진" />
}))}
{btn && (<p className="contents-end">마지막 페이지 입니다.</p>)}
</div>}
          {saveinfo === 1 && <div className="contents1">게시글이 없습니다</div>}
          {saveinfo === 2 && <div className="contents2"><h3>[반품/교환]</h3><br /><p>고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다. <br /> 확인과정에서 도난 카드의 사용이나 타인 명의의 주문등 정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할 수 있습니다.</p>
          <br />무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.  
주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, <br />7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다. <br /><br /><br /><h3>[ 배송정보 ]</h3><br /><p>배송 방법 : 택배 <br />
배송 지역 : 전국지역 <br />
배송 비용 : 2,500원 <br />
배송 기간 : 3일 ~ 7일 <br /><br />
배송 안내 : - 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는 경우가 있습니다. <br />
고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다. 다만, 상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.</p><br /><br /> <h3>[ 교환 및 반품정보 ]</h3><br /> 교환 및 반품이 가능한 경우 <br />
 - 계약내용에 관한 서면을 받은 날부터 7일. 단, 그 서면을 받은 때보다 재화등의 공급이 늦게 이루어진 경우에는 재화등을 공급받거나 재화등의 공급이 시작된 날부터 7일 이내 <br />
  - 공급받으신 상품 및 용역의 내용이 표시.광고 내용과 다르거나 계약내용과 다르게 이행된 때에는 당해 재화 등을 공급받은 날 부터 3월이내, 그사실을 알게 된 날 또는 알 수 있었던 날부터 30일이내 <br /><br /><br />교환 및 반품이 불가능한 경우 <br />- 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우(다만, 재화 등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는 청약철회를 할 수 있습니다)
  <br />- 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한 경우 <br />- 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가 현저히 감소한 경우 <br />- 복제가 가능한 재화등의 포장을 훼손한 경우 <br /><br />※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은 고객님께서 부담하셔야 합니다.</div>}
          {saveinfo === 3 && <div className="contents1">게시글이 없습니다</div>}
        </div>

</div>
    
  );
}

export default ProductDetail;