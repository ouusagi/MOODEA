export async function requestPayment({ orderId, amount, orderName, customerName, items }) {

    window.sessionStorage.setItem(orderId, JSON.stringify(items));
    const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY; // 1. env에서 클라이언트 key값을 불러와 인증 준비

    const tossPayments = new window.TossPayments(clientKey); // 2. CDN으로 브라우저 전역(window)에 등록된 Tosspayments 클래스로
                                                             //    클라이언트 키를 전달해 '결제 기능 객체(인스턴스)' 생성 
                                                             //    TossPayments = 결제 기능이 담긴 클래스

    tossPayments.requestPayment("카드", { // 3. 받아온 값을 토대로 결제 페이지를 실행
        amount,
        orderId,
        orderName,
        customerName,
        successUrl: window.location.origin + "/payment/success",
        failUrl: window.location.origin + "/payment/fail"
    });
}

// - 작동원리 -
// 1. .env에서 가져온 클라이언트 키로 인증
// 2, CDN 으로 인해 브라우저에 생성 된 TossPayments 클래스에 키를 넣어 인증된 결제 기능 객체를 생성 (new까지 붙혀야 동작 가능한 새로운 인스턴스로 생성됨)
// 3. 완성 된 결제기능을 requestPayment로 실행 (파라미터로 전달 받은 값과 결제 후의 성공/실패 여부에 따라 해당 url로 이동)



// -클래스란: 이미 제작되어 있는 코드 뭉탱이를 짧게 적어서 쓸 수 있게 해주는 것 (설계도,마크 명령어 느낌)-



// - 코드 정리 -
// 이 함수는 다른 곳에서도 사용할 수 있도록 export 되어 있고,
// 토스 결제 과정이 비동기이기 때문에 async 함수로 작성되어 있다.
// 장바구니나 상품 상세 페이지에서 전달받은 orderId·amount 같은 값들은
// 함수의 파라미터로 받아서 결제 요청에 그대로 사용한다.

// 함수 내부에서는 먼저 .env에 있는 클라이언트 키를 불러와 인증에 사용한다.
// CDN으로 로드한 TossPayments 클래스는 브라우저의 window 객체에 존재하고,
// 이 클래스는 ‘결제 기능 설계도’ 역할을 한다.

// 이 설계도에 클라이언트 키를 넣고 new를 사용하면
// 실제로 동작 가능한 결제 기능 인스턴스가 생성되고,
// 그 인스턴스를 tossPayments 변수에 담는다.

// 마지막으로 tossPayments.requestPayment() 메서드를 호출하면
// 결제창이 실행되며, 전달받았던 값들을 기반으로 결제가 진행되고
// 성공/실패에 따라 지정된 URL로 이동한다.