import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.44.2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",  // 어느 url이든 다 허가 
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",  // 클라이언트가 요청에 포함해서 보내도 되는 헤더 목록
};


serve(async (req) => {

  if (req.method === "OPTIONS") {
  return new Response("ok", { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )

  const authHeader = req.headers.get("Authorization")
  if(!authHeader){return new Response("Unauthorized", {status:401, headers:corsHeaders})}
  const jwt = authHeader.replace("Bearer ","")

  const {data:userData, error:userError} = await supabase.auth.getUser(jwt)
  if(userError || !userData?.user){return new Response("Unauthorized", {status: 401, headers:corsHeaders})}

  const userId = userData.user.id

  await supabase.from("Cart").delete().eq("user_id",userId)
  await supabase.from("Orders").delete().eq("user_id",userId)
  await supabase.from("OrderHeaders").delete().eq("user_id",userId)
  await supabase.from("Wishlist").delete().eq("user_id",userId)
  await supabase.from("users").delete().eq("id",userId)
  await supabase.auth.admin.deleteUser(userId)

  return new Response(JSON.stringify({success:true}),{headers:{...corsHeaders,"Content-Type": "application/json"}})
})