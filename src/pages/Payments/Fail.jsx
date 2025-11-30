import { useEffect, useState } from "react"
import App from "../../App"
import supabase from "../../supabaseClient"
import './Payments.css'

function Fail(){


    return(
        <div>
             <div className="Fail-container">
                <div className="Fail-Error-box">
                    <p className="Fail-Error-text1">"Error 402 — 결제가 실패했습니다."</p>
                    <p className="Fail-Error-text2">네트워크 문제 또는 승인 거절로 결제를 완료할 수 없습니다.</p>
                    <p className="Fail-Error-text2">다시 시도하거나, 다른 결제 수단을 이용해주세요.</p>

                    <img src="https://ogqmarket.img.sooplive.co.kr/sticker/174d3c0641600c6/14.png" alt="error-img-sad-cat" />
                </div>
             </div>
        </div>
    )
}
export default Fail