import { useParams,useNavigate } from 'react-router-dom';
import './HelpCenterPage.css'
import { useState, useEffect } from "react"



function HelpCenterPage() {  
  
  const faqList = [
  {
    question: "회원가입은 필수인가요?",
    answer: `네, 상품 구매 및 주문 내역 확인을 위해 회원가입이 필요합니다.
회원가입은 이메일 인증 방식으로 진행되며, 로그인 후 모든 서비스를 이용하실 수 있습니다.`,
  },
  {
    question: "비회원 구매가 가능한가요?",
    answer: `현재는 비회원 구매를 지원하지 않습니다.
보다 안전한 결제 및 주문 관리를 위해 회원가입 후 이용을 부탁드립니다.`,
  },
  {
    question: "배송은 얼마나 걸리나요?",
    answer: `결제 완료 후 평균 2~4영업일 이내에 배송됩니다.
도서·산간 지역의 경우 배송이 다소 지연될 수 있습니다.`,
  },
  {
    question: "배송비는 얼마인가요?",
    answer: `기본 배송비는 3,000원이며,
 50,000원 이상 구매 시 무료 배송 혜택이 제공됩니다.`,
  },
  {
    question: "주문 취소는 어떻게 하나요?",
    answer: `상품 준비 전 상태에서는 마이페이지에서 직접 주문 취소가 가능합니다.
이미 배송이 시작된 경우에는 고객센터로 문의해 주세요.`,
  },
  {
    question: "교환 및 환불은 가능한가요?",
    answer: `상품 수령 후 7일 이내에 교환 및 환불이 가능합니다.
단, 사용 흔적이 있거나 개봉된 제품은 교환·환불이 제한될 수 있습니다.`,
  },
  {
    question: "적립금은 어떻게 사용하나요?",
    answer: `적립금은 결제 시 사용 가능하며,
보유 적립금 내에서 자유롭게 적용할 수 있습니다.`,
  },
  {
    question: "회원 탈퇴는 어디서 하나요?",
    answer: `마이페이지 > 회원정보 수정 메뉴에서 회원 탈퇴가 가능합니다.
탈퇴 시 보유 적립금과 쿠폰은 모두 소멸됩니다.`,
  },
  {
    question: "결제 수단에는 어떤 것이 있나요?",
    answer: `신용카드, 체크카드, 계좌이체, 간편결제 서비스를 지원하고 있습니다.
지원 결제 수단은 결제 화면에서 확인하실 수 있습니다.`,
  },
  {
    question: "현금영수증 발급이 가능한가요?",
    answer: `계좌이체 결제 시 현금영수증 발급이 가능합니다.
결제 단계에서 신청하거나 마이페이지에서 발급 내역을 확인할 수 있습니다.`,
  },
  {
    question: "쿠폰은 어떻게 사용하나요?",
    answer: `보유한 쿠폰은 결제 페이지에서 선택하여 적용할 수 있습니다.
쿠폰은 중복 사용이 불가하며 유효기간 내에만 사용 가능합니다.`,
  },
  {
    question: "쿠폰과 적립금을 동시에 사용할 수 있나요?",
    answer: `일부 쿠폰에 한해 적립금과 동시 사용이 가능합니다.
결제 페이지에서 사용 가능 여부를 확인해 주세요.`,
  },
  {
    question: "상품이 품절되면 어떻게 되나요?",
    answer: `상품이 품절된 경우 구매가 제한되며,
재입고 시 상품 상세 페이지를 통해 안내드립니다.`,
  },
  {
    question: "주문 내역은 어디서 확인하나요?",
    answer: `로그인 후 마이페이지 > 주문 내역 메뉴에서
이전 주문 내역과 배송 상태를 확인할 수 있습니다.`,
  },
  {
    question: "배송지 주소를 변경할 수 있나요?",
    answer: `상품 준비 전 단계에서는 마이페이지에서 배송지 변경이 가능합니다.
배송이 시작된 이후에는 변경이 어려울 수 있습니다.`,
  },
  {
    question: "고객센터 운영 시간은 언제인가요?",
    answer: `고객센터는 평일 오전 10시부터 오후 6시까지 운영됩니다.
점심시간(12:00~13:00)에는 상담이 제한될 수 있습니다.`,
  },
];  
    

    let [inputValue,setinputValue] = useState('') // 인풋창에 입력한 값
    let [togle,settogle] = useState(null)
    const [filteredList, setFilteredList] = useState(faqList); // 검색결과 필터링 된 값
    const navigate = useNavigate()
    const {page} = useParams()
    const nowpage = Number(page) || 1
    const pageQAcount = 8
    const totalpage = Math.ceil(filteredList.length / pageQAcount)
    const slicepage = filteredList.slice((nowpage - 1 ) * pageQAcount, nowpage * pageQAcount)


    const OpenTogle = (i)=>{
        settogle(prev =>(prev === i ? null : i))
    }

    const SearchQA = ()=>{
        const keyword = inputValue.trim().toLowerCase()
        if(!keyword){ // 아직 검색하지 않은 상태일 때 전체 FAQ 목록을 화면에 보여줌
            setFilteredList(faqList)
            return;
        }
        const result = faqList.filter(item => item.question.toLowerCase().includes(keyword) || item.answer.toLowerCase().includes(keyword))
        setFilteredList(result)
    }

    
    return (

    <div className='HelpCenter-bg'>
        <div className='HelpCenter-Top-box'>
            <p>도움이 필요하신가요?</p>
            <div className='HelpCenter-input-box'>
            <input type="text" placeholder='궁금한 점을 찾아보세요' value={inputValue} onChange={(e)=> {setinputValue(e.target.value)}} onKeyDown={(e)=>{if(e.key === "Enter")
            {SearchQA(); navigate("/helpcenter/1"); settogle(null);}}}/>
            <span onClick={()=>{SearchQA(); navigate('/helpcenter/1'); settogle(null);}}><i className="fa-solid fa-magnifying-glass HelpCenter-search-icon"></i></span>
            </div>
        </div>


        <div className='HelpCenter-FNQ'>
            <p>자주 묻는 질문 (F&Q)</p>
        </div>


        <div className='HelpCenter-FNQ-List-bg'>

            { slicepage.map((item,i)=> (
            <div className='HelpCenter-FNQ-box' key={i}>
                <div className='FNQ-Headers' onClick={()=>{OpenTogle(i)}}>
                    <p>Q. {item.question}</p>
                </div>

                
                <div className={`FNQ-Body ${togle === i ? "open" : ""}`}>
                    <p>A. {item.answer}</p>
                </div>

            </div>
            ))}

        </div>

        <div className='HelpCenter-FNQ-Pagination'>
            <button disabled={nowpage === 1} onClick={()=>{if(nowpage > 1){settogle(null); navigate(`/helpcenter/${nowpage - 1}`);}}}>이전</button>
            <p>- {nowpage} 페이지 -</p>
            <button disabled={nowpage === totalpage} onClick={()=>{if(nowpage < totalpage){settogle(null); navigate(`/helpcenter/${nowpage + 1}`);}}}>디음</button>
        </div>

    </div>

  );


}

export default HelpCenterPage;