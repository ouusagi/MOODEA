import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.44.2';

// ⚠️ 환경 변수 설정 (Service Role Key 사용으로 변경)
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''; // 🚨 Service Key 사용

// 요청 바디의 타입 정의
interface OrderData {
  orderId: string;
  total_amount_verified: number;
  userId: string; 
  items: Array<{ product_id: string; price: number; quantity: number; [key: string]: any }>;
  earnpoint: number;
}

serve(async (req) => {
    
    // 💡 1. CORS 헤더 설정
    const headers = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    // 💡 2. OPTIONS 메서드 (Preflight 요청) 처리
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers, status: 200 }); 
    }

    // 3. 인증 토큰 확인 및 클라이언트 초기화
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        return new Response(JSON.stringify({ error: '인증 토큰 누락' }), { status: 401, headers: { 'Content-Type': 'application/json', ...headers } });
    }
    const token = authHeader.replace('Bearer ', '');
    
    // 💡 Service Role Key를 사용하여 클라이언트 초기화 (RLS 우회)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY); 
    
    // 4. 사용자 세션 확인 (토큰 유효성 검사 및 user.id 확보용)
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
        return new Response(JSON.stringify({ error: '유효하지 않은 사용자 토큰' }), { status: 401, headers: { 'Content-Type': 'application/json', ...headers } });
    }

    // 5. 요청 데이터 파싱 및 검증
    let data: OrderData;
    try {
        data = await req.json();
    } catch {
        return new Response(JSON.stringify({ error: '유효하지 않은 JSON 형식' }), { status: 400, headers: { 'Content-Type': 'application/json', ...headers } });
    }
    
    const { orderId, total_amount_verified, userId, items, earnpoint } = data;

    // 6. DB에 저장된 유저 ID와 요청된 ID 일치 확인 (보안 강화)
    if (user.id !== userId) {
        return new Response(JSON.stringify({ error: '요청한 사용자와 인증된 사용자가 일치하지 않습니다.' }), { status: 403, headers: { 'Content-Type': 'application/json', ...headers } });
    }

    // 7. 🛡️ OrderHeaders 테이블에 임시 주문서 INSERT
    // 💡 RLS가 우회되므로 삽입이 성공해야 합니다.
    const { error: headerError } = await supabase
        .from('OrderHeaders') // 🚨 수정된 테이블 이름 사용
        .insert([
            {
                order_id: orderId,
                user_id: user.id, // 💡 인증된 토큰의 ID 사용
                total_amount_verified: total_amount_verified, 
                payment_status: 'PENDING', 
                earn_point:earnpoint
            },
        ]);

    if (headerError) {
        console.error('Header Insert Error:', headerError);
        return new Response(JSON.stringify({ error: '주문서 헤더 생성 실패', details: headerError.message }), { status: 500, headers: { 'Content-Type': 'application/json', ...headers } });
    }

    // 8. 성공 응답 반환
    return new Response(JSON.stringify({ success: true, message: '주문서가 성공적으로 생성되었습니다.', orderId: orderId }), {
        headers: { 'Content-Type': 'application/json', ...headers },
        status: 200,
    });
});