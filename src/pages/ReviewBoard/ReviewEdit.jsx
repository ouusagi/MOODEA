import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../../supabaseClient"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import './ReviewPost.css'



function ReviewEdit() {
    let [user,setUser] = useState(null)
  const { reviewId } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [contents, setContents] = useState("")
  const plainText = contents.replace(/<[^>]*>/g, "").trim()

    useEffect(()=>{
        async function UserInfo() {
            const {data:UserData, error:UserError} = await supabase.auth.getUser()
            if(UserError){console.log(UserError.message); alert("유저 정보가 일치하지 않습니다"); return;}
            setUser(UserData.user.id)
        }
        UserInfo()
    },[reviewId])


    useEffect(() => {
    if(!user) return;
    async function fetchReview() {
    const { data:fetchData, error:fetchError } = await supabase
      .from("Reviews_Post")
      .select("*")
      .eq("id", reviewId)
      .eq("user_id",user)
      .single()

    if (fetchError) return console.log(fetchError.message)

    setTitle(fetchData.title)
    setContents(fetchData.contents)
    }

    fetchReview()
    }, [reviewId, user])


    const UpdatePost = async ()=>{
        if(!title.trim() || !plainText){alert("모든 항목을 입력해주세요."); return;}
        const {error:updateError} = await supabase
        .from("Reviews_Post")
        .update({title:title, contents:contents})
        .eq("id", reviewId)
        if(updateError){console.log(updateError.message); alert("에러가 발생하였습니다. 다시 시도해주세요."); return;}
        alert("글이 수정되었습니다 !")
        navigate(`/reviewdetail/${reviewId}`)
    }


    return(
        <div className="ReviewPost-bg">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해 주세요." style={{marginBottom : "0.5rem"}}/>
            <ReactQuill value={contents} onChange={setContents}/>
            <div className="post-button">
            <button onClick={()=>{UpdatePost()}}>수정</button>
            </div>
        </div>
    )
}


export default ReviewEdit