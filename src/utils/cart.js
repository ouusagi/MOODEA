import supabase from "../supabaseClient";

export async function addToCart(userId, item) {
        const {data:CartItem, error:CartError} = await supabase
        .from('Cart')
        .select('*')
        .eq('product_id', item.product_id)
        .eq('user_id', userId)
        .maybeSingle()

        if(CartItem){alert('이미 장바구니에 담겨있는 제품입니다.'); console.log(CartError.message); return}
        if(CartError){alert('에러가 발생하였습니다.'); console.log(CartError.message); return}

        else{
            const {error:InsertItemError} = await supabase.from('Cart')
            .insert({
                user_id:userId,
                product_id:item.product_id,
                quantity:1,
                photo:item.photo,
                price:item.price,
                name:item.name,
                brand:item.brand
            })
             if(InsertItemError){alert("에러가 발생하였습니다"); console.log(InsertItemError.message); return}
             alert("장바구니에 담겼습니다 ! 🛒")
        }
    }