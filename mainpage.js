const ADclosebox = document.querySelector(".AD-item2 input")
const ADheader = document.querySelector(".AD-container")
const slide = document.querySelector('.slide');
const indicator = document.querySelectorAll('.indicator')


// 회원가입 쿠폰 지급 팝업 닫으면 모든 요소 마진 원상복귀 로직
ADclosebox.addEventListener("click",function(){
    ADheader.style.display = "none"
    document.body.style.marginTop = "0"
})
// 회원가입 쿠폰 지급 팝업 닫으면 모든 요소 마진 원상복귀 로직


// 인디케이터 캐러셀 이동 로직
indicator.forEach((a,i)=>{
    a.addEventListener('click',function(){
        let index = i;
        slide.style.transform = `translate(-${index * 100}vw)`
    })
})
// 인디케이터 캐러셀 이동 로직