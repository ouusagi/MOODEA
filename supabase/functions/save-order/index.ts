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
    const { orderId, paymentKey, amount, user_id } = await req.json();

    const supabase = createClient(
      Deno.env.get("PROJECT_URL")!,
      Deno.env.get("SERVICE_ROLE_KEY")!
    );

    // 1) 이미 저장된 주문인지 확인
    const { data: existingOrder, error: checkError } = await supabase
      .from("Orders")
      .select("id")
      .eq("order_id", orderId)
      .maybeSingle();

    if (checkError) {
      return new Response(JSON.stringify({ error: checkError.message }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 이미 존재하면 다시 insert 하지 않음
    if (existingOrder) {
      return new Response(JSON.stringify({ message: "Already saved" }), {
        status: 200,
        headers: corsHeaders
      });
    }

    // 2) 존재하지 않을 때만 새로 insert
    const { error } = await supabase
      .from("Orders")
      .insert({
        user_id,
        order_id: orderId,
        payment_key: paymentKey,
        amount
      });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: corsHeaders
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: corsHeaders
    });
  }

  return new Response("Method not allowed", {
    status: 405,
    headers: corsHeaders
  });
});
