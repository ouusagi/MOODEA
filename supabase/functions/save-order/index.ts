import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Accept, Origin, X-Requested-With",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders
    });
  }

  if (req.method === "POST") {
    // ⬇ 프론트엔드에서 보낸 결제 정보(paymentKey, amount)와 상품 배열(items)을 모두 받습니다.
    const { orderId, paymentKey, amount, user_id, items } = await req.json();

    // ⛔ 필수 파라미터 체크
    if (!orderId || !user_id || !items || items.length === 0 || !paymentKey || !amount) {
      return new Response(JSON.stringify({ error: "Missing required data (orderId, paymentKey, amount, or items)" }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const supabase = createClient(
      Deno.env.get("PROJECT_URL")!,
      Deno.env.get("SERVICE_ROLE_KEY")!
    );
    
    // =======================================================
    // 1단계: 주문 Header 정보 저장 (OrdersHeader 테이블)
    // =======================================================
    const { error: headerError } = await supabase
      .from("OrderHeaders") // ⬅ 결제 정보를 저장할 테이블 이름
      .insert({
        order_id: orderId,
        user_id: user_id,
        paymentKey: paymentKey, // ✅ 결제 키
        amount: amount,          // ✅ 총 결제 금액
      });

    if (headerError) {
      return new Response(JSON.stringify({ error: `Header INSERT Error: ${headerError.message}` }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // =======================================================
    // 2단계: 개별 상품 정보 저장 (Orders 테이블)
    // =======================================================
    
    // 1. 배열 변환: items 배열의 각 요소를 DB의 행(Row) 객체로 변환합니다.
    const itemsToInsert = items.map(item => ({
        // order_id를 외래키로 사용하여 OrderHeaders 테이블과 연결
        order_id: orderId,
        user_id: user_id, 
        
        // 상품 정보 (DB 컬럼 이름과 일치하는지 확인 필요)
        product_id: item.product_id, 
        name: item.name,           
        price: item.price,         
        quantity: item.quantity,   
        brand: item.brand,         
        photo: item.photo,         
    }));

    // 2. 일괄 삽입 (Batch Insert)
    const { error: itemsError } = await supabase
      .from("Orders") // ⬅ 개별 상품 정보를 저장할 테이블 이름
      .insert(itemsToInsert);

    if (itemsError) {
      return new Response(JSON.stringify({ error: `Items INSERT Error: ${itemsError.message}` }), {
        status: 400,
        headers: corsHeaders
      });
    }

    return new Response(JSON.stringify({ success: true, message: "Order and Items successfully saved" }), {
      headers: corsHeaders
    });
  }

  return new Response("Method not allowed", {
    status: 405,
    headers: corsHeaders
  });
});