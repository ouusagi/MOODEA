import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Accept, Origin, X-Requested-With",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const TOSS_SECRET_KEY = Deno.env.get("TOSS_SECRET_KEY"); // 💡 환경변수 이름 확인
const TOSS_API_URL = "https://api.tosspayments.com/v1/payments/confirm";

Deno.serve(async (req) => {
  
  // 💡 최상위 레벨에서 발생하는 예외까지 처리하여 CORS/500 에러 방지
  try { 
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    if (req.method === "POST") {
      
      let data;
      try {
          data = await req.json();
      } catch (e) {
          return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers: corsHeaders });
      }
      
      const { orderId, paymentKey, amount, user_id, items } = data;
      let tossResponse: any; // ✅ 수정: tossResponse를 try 블록 바깥에 선언

      // ⛔ 필수 파라미터 체크
      if (!orderId || !user_id || !items || items.length === 0 || !paymentKey || !amount) {
        return new Response(JSON.stringify({ error: "Missing required data" }), {
          status: 400,
          headers: corsHeaders
        });
      }

      const supabase = createClient(
        Deno.env.get("PROJECT_URL")!,
        Deno.env.get("SERVICE_ROLE_KEY")!
      );
      
      // =======================================================
      // 🚨 1단계: DB에서 임시 저장된 금액 조회 (A_DB)
      // =======================================================
      const { data: dbOrderHeader, error: dbError } = await supabase
          .from("OrderHeaders") 
          .select("total_amount_verified, earn_point, selectedCoupon")
          .eq("order_id", orderId)
          .single();
      
      if (dbError) {
          return new Response(JSON.stringify({ error: `주문 헤더 조회 실패: ${dbError.message}` }), {
              status: 500,
              headers: corsHeaders
          });
      }
      if (!dbOrderHeader) {
          return new Response(JSON.stringify({ error: "유효한 주문서 정보를 찾을 수 없습니다." }), {
              status: 404,
              headers: corsHeaders
          });
      }
      
      const dbAmount = dbOrderHeader.total_amount_verified; 
      const dbPoint = dbOrderHeader.earn_point;
      const dbCoupon = dbOrderHeader.selectedCoupon
      
      // =======================================================
      // 🚨 2단계: 토스페이먼츠에 결제 승인 요청 및 검증
      // =======================================================
      try {
        if (!TOSS_SECRET_KEY) {
          throw new Error("TOSS_SECRET_KEY is not set.");
        }
        
        const encodedSecret = btoa(`${TOSS_SECRET_KEY}:`);

        const response = await fetch(TOSS_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Basic ${encodedSecret}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ orderId, amount, paymentKey })
        });

        tossResponse = await response.json(); // ✅ tossResponse에 값 할당

        // 1. 토스 서버 응답 확인 (200 OK가 아니면 실패)
        if (!response.ok) {
          return new Response(
            JSON.stringify({ error: tossResponse.message || "Toss Payment Server Error" }),
            { status: 400, headers: corsHeaders }
          );
        }
        
        // 2. 🛡️ DB 금액 vs 토스 실제 금액 검증 
        if (tossResponse.totalAmount !== dbAmount) {
          console.error(`Forgery: Toss Amount ${tossResponse.totalAmount} != DB Amount ${dbAmount}`);
          return new Response(JSON.stringify({ error: "Payment amount mismatch: DB verification failed" }), {
            status: 403, 
            headers: corsHeaders
          });
        }
        
        // 3. 🛡️ 클라이언트 요청 금액 vs 토스 실제 금액 검증 
        if (tossResponse.totalAmount !== amount) {
          return new Response(JSON.stringify({ error: "Payment amount mismatch: Client request verification failed" }), {
            status: 403, 
            headers: corsHeaders
          });
        }

      } catch (e) {
        console.error("Toss Fetch Error:", e);
        return new Response(JSON.stringify({ error: "Internal server error during Toss verification" }), {
          status: 500, 
          headers: corsHeaders
        });
      }

      // =======================================================
      // 3단계: DB 저장 (검증 성공 후)
      // =======================================================

      // 1. 주문 Header 정보 업데이트 
      const { error: headerUpdateError } = await supabase
          .from("OrderHeaders") 
          .update({
              paymentKey: paymentKey,
              amount: tossResponse.totalAmount, // ✅ 수정된 tossResponse 사용
              payment_status: 'PAID',
              earn_point:dbPoint,
              selectedCoupon:dbCoupon
          })
          .eq('order_id', orderId); 

      if (headerUpdateError) {
        return new Response(JSON.stringify({ error: `Header UPDATE Error: ${headerUpdateError.message}` }), {
          status: 500,
          headers: corsHeaders
        });
      }

      // 2. 개별 상품 정보 저장 
      const itemsToInsert = items.map((item: any) => ({
          order_id: orderId,
          user_id: user_id, 
          product_id: item.product_id, 
          name: item.name,           
          price: item.price,         
          quantity: item.quantity,   
          brand: item.brand,         
          photo: item.photo,         
      }));

      const { error: itemsError } = await supabase
        .from("Orders") 
        .insert(itemsToInsert);

      if (itemsError) {
        return new Response(JSON.stringify({ error: `Items INSERT Error: ${itemsError.message}` }), {
          status: 500,
          headers: corsHeaders
        });
      }

      const {data:UserPointData, error:UserPointError} = await supabase
      .from("users")
      .select("point")
      .eq("id",user_id)
      .single()

      if(UserPointError){console.log(UserPointError.message); return;}

      await supabase
      .from("users")
      .update({point:UserPointData.point + dbPoint})
      .eq("id",user_id)


      if(dbCoupon){
      const {error:UserCouponError} = await supabase
      .from("user_coupons")
      .update({used:true})
      .eq("id",dbCoupon)
      .eq("used",false)
      if(UserCouponError){console.log(UserCouponError.message); return;}
      }

      // =======================================================
      // 4단계: 최종 성공 반환
      // =======================================================
      
      return new Response(JSON.stringify({ success: true, message: "Payment verified and order saved" }), {
        status: 200, 
        headers: corsHeaders
      });
    }

    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders
    });

  } catch (globalError: any) {
      // 🚨 최상위 레벨에서 잡힌 500 에러 처리 (CORS 포함)
      console.error("Global Handler Error:", globalError);
      return new Response(JSON.stringify({ error: "Unhandled Internal Server Error", details: globalError.message || String(globalError) }), {
          status: 500, 
          headers: corsHeaders
      });
  }
});