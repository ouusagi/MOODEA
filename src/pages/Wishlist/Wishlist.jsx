import { useEffect, useState } from "react"
import App from "../../App"
import supabase from "../../supabaseClient"
import './Wishlist.css'

function Wishlist(){

    let [userId,setuserId] = useState(null)
    let [product,setproduct] = useState([])
    


    useEffect(()=>{
        async function GetUsers() {
            const {data:sessionData, error:sessionError} = await supabase.auth.getSession()

            if(sessionError){
                console.log(sessionError.message); 
                alert("유저 정보를 불러오는 도중 에러가 발생하였습니다."); 
                return;
            }

            if(!sessionData?.session?.user?.id){alert("로그인이 필요한 서비스 입니다."); return;}
            
            const {data:WishItem, error:WishError} = await supabase
            .from("Wishlist")
            .select("product_id")
            .eq("user_id",sessionData?.session?.user?.id)

            if(WishError){console.log(WishError.message); return;}
            else{setproduct(WishItem)}
            
        }

        GetUsers()
    },[])


    return(
        <div>
        
        <div className="Wishlist-container">

            <div className="Wishlist-title-box">
                <p className="Wishlist-title-p1">위시리스트</p>
                <p className="Wishlist-title-p2">{product.length} items</p>
            </div>

        </div>
       
        </div>
    )
}
export default Wishlist