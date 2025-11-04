import App from "../../App"
import './Cart.css'

function Cart(){


    return(
        <div>
        
        <div className="cart-container">

            <div className="cart-title-box">
                <p className="cart-title-p1">장바구니</p>
                <p className="cart-title-p2">2 items</p>
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

                   <div className="cart-item-list-box">
                      <div className="cart-item-list-info">
                        <div className="cart-item">
                            <img src="https://images.unsplash.com/photo-1615041273737-0f71b155cfa9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <div className="cart-item-name">
                            <h3>보타니컬 배스 소크 500ml 블루베리,키위,자몽향</h3>
                            <h5>헬라코</h5>
                            </div>
                        </div>

                        <div className="cart-item">26,000원</div>
                        <div className="cart-item">
                            <button>-</button>
                            <span>3</span>
                            <button>+</button>
                        </div>
                        <div className="cart-item">78,000원</div>
                        <div className="cart-item remove-btn">
                        <i class="fa-solid fa-xmark"></i>
                        </div>
                      </div>
                   </div>


                   <div className="cart-item-list-box">
                      <div className="cart-item-list-info">
                        <div className="cart-item">
                            <img src="https://images.unsplash.com/photo-1746904305806-a9ce08b33dc2?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <div className="cart-item-name">
                            <h3>밸런스풀 시카 마스크 10매</h3>
                            <h5>엘데퓨어</h5>
                            </div>
                        </div>

                        <div className="cart-item">30,000원</div>
                        <div className="cart-item">
                            <button>-</button>
                            <span>1</span>
                            <button>+</button>
                        </div>
                        <div className="cart-item">30,000원</div>
                        <div className="cart-item remove-btn">
                        <i class="fa-solid fa-xmark"></i>
                        </div>
                      </div>
                   </div>
                   

                   


              </div>

              <div className="cart-total-modal">
                <p>최종 결제 금액</p>
                <hr />
                <p>주문금액 : 108,000원</p>
                <p>할인금액 : 0원</p>
                <p>상품 총 개수 : 4개</p>
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