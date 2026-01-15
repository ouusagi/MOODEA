import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useState, useEffect } from "react"
import App from "../../App"
import supabase from "../../supabaseClient"
import './ReviewPost.css'
import { useNavigate } from "react-router-dom"

function ReviewPost(){

    let [user,setUser] = useState(null)
    let [order,setOrder] = useState([])
    let [title,setTitle] = useState("")
    let [selectedOrderId,setSelectedOrderId] = useState("")
    const [content,setContent] = useState("");
    let navigate = useNavigate()
    
    useEffect(()=>{
      async function GetUser() {
        const {data:userData, error:userError}= await supabase.auth.getUser()
        if(userError){console.log(userError.message); return;}
        setUser(userData.user.id)
      }
      GetUser()
    },[])

    useEffect(()=>{
      if(!user) return;
        async function GetOrders(){
          const {data:OrdersData, error:OrdersError} = await supabase
          .from("Orders")
          .select("*")
          .eq("user_id",user)
          .eq("review_available",true)
          if(OrdersError){console.log(OrdersError.message); return;}
          setOrder(OrdersData)
        }
        GetOrders()
    },[user])

    const handleSubmit = async ()=> {
      if(!user || !title || !selectedOrderId || !content){alert("모든 항목을 입력해주세요."); return;}
      const { error:PostError } = await supabase
      .from("Reviews_Post")
      .insert([{user_id:user, title:title, contents:content, order_id:selectedOrderId}])
      if(PostError){console.log(PostError.message); alert("리뷰 작성 중 에러가 발생하였습니다. 다시 시도해주세요."); return;}

      const { error:UpdateError } = await supabase
      .from("Orders")
      .update({review_available: false})
      .eq("id",Number(selectedOrderId))
      if(UpdateError){console.log(UpdateError.message); alert("에러가 발생하였습니다. 다시 시도해주세요."); return;}
      alert("리뷰가 등록되었습니다 !")
      navigate("/reviewboard")
    }

    return(
        <div className="ReviewPost-bg">
            <p>리뷰작성</p>
            <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="제목을 입력해 주세요."/>
            <select value={selectedOrderId} onChange={(e)=>{setSelectedOrderId(e.target.value)}}>
                <option value="">리뷰를 작성할 상품을 골라주세요.</option>
                {order.map((item)=>{
                return  <option key={item.id} value={item.id}>{item.name} / {item.quantity}개</option>
                })}
            </select>

            <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [{ size: ["small", false, "large"] }],
            [{ color: [] }],
            [{ align: [] }],
            ["image"]
          ]
        }}
      />

      <div className="post-button">
      <button onClick={()=>{handleSubmit()}}>등록</button>
      </div>

        </div>
    )
}
export default ReviewPost