import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useState, useEffect } from "react"
import App from "../../App"
import supabase from "../../supabaseClient"
import './ReviewDetail.css'
import { useNavigate, useParams} from "react-router-dom"

function ReviewDetail(){

    let [comment,setComment] = useState("")
    let [comments,setComments] = useState([])
    let [reviews,setReviews] = useState(null)
    const [user,setUser] = useState(null)
    const {reviewId} = useParams()
    let navigate = useNavigate()


    const fetchComments = async ()=>{
        const {data: fetchData, error: fetchError} = await supabase
        .from("Reviews_comments")
        .select(`id,content,created_at, user_id, user_public (username)`)
        .eq("review_id",reviewId)
        .order("created_at", {ascending:false})
        if(fetchError){console.log(fetchError.message); return;}
        setComments(fetchData)
    }

    useEffect(()=>{
        fetchComments()
        async function GetUser() {
            const {data:userData, error:userError} = await supabase.auth.getUser()
            if(userError){console.log(userError.message); alert("유저 정보를 불러오는데 에러가 발생하였습니다."); return;}
            setUser(userData.user.id)
        }
        GetUser()
    },[reviewId])

    useEffect(()=>{
        async function fetchReview() {
            const {data:ReviewData, error:ReviewError} = await supabase
            .from("Reviews_Post")
            .select(`*, user_public (username)`)
            .eq("id",reviewId)
            .single()
            if(ReviewError){console.log(ReviewError.message); return;}
            setReviews(ReviewData)

            await supabase
            .from("Reviews_Post")
            .update({view_count:ReviewData.view_count + 1})
            .eq("id",reviewId)
        }
        fetchReview()
    },[reviewId])

    if(!reviews){return <div>로딩중...</div>}

    const addComment = async ()=>{
        if(!comment.trim()){alert("댓글을 작성해주세요.");return;}
        if(!user){alert("로그인이 필요한 서비스입니다.");return;}
        const { error:insertError } = await supabase
        .from("Reviews_comments")
        .insert([{review_id:reviewId, user_id:user, content:comment}]);
        if(insertError){console.log(insertError.message); alert("에러가 발생하였습니다. 다시 시도해주세요."); return;}
        alert("댓글이 작성되었습니다 !");
        setComment("")
        fetchComments()
    }

    const DeleteComments = async (commentId)=>{
        if(!window.confirm("댓글을 삭제하시겠습니까?")) return;
        const {error:deleteError} = await supabase
        .from("Reviews_comments")
        .delete()
        .eq("id",commentId)
        .eq("user_id",user)
        if(deleteError){console.log(deleteError.message); alert("삭제에 실패했습니다. 다시 시도해주세요"); return;}
        fetchComments()
    }

    const DeletePost = async ()=>{
        if(!window.confirm("정말로 이 글을 삭제하시겠습니까?")) return;
        const {error:deleteCommentsError} = await supabase
        .from("Reviews_comments")
        .delete()
        .eq("review_id",reviewId)
        if(deleteCommentsError){console.log(deleteCommentsError.message); alert("댓글 삭제에 실패했습니다."); return;}
        
        const {error:deletePostError} = await supabase
        .from("Reviews_Post")
        .delete()
        .eq("id",reviewId)
        .eq("user_id",user)
        if(deletePostError){console.log(deletePostError.message); alert("글삭제에 실패했습니다. 다시 시도해주세요"); return;}

        alert("리뷰가 삭제되었습니다.")
        navigate("/reviewboard")
    }

    return(
        
        <div className="ReviewDetail-bg">
            
            <div className="ReviewDetail-title">
                <p>{reviews.title}</p>
            </div>

            <div className="ReviewDetail-info">
                <p>{reviews.user_public?.username} | {new Date(reviews.created_at).toLocaleString()}</p>
                <p>조회수 {reviews.view_count}</p>
            </div>

            <hr />

            <div className="ReviewDetail-content">
                <p dangerouslySetInnerHTML={{ __html: reviews.contents }}></p>
            </div>

            { reviews.user_id === user && (
            <div className="ReviewDetail-btn">
                <button onClick={()=>{navigate(`/reviewedit/${reviewId}`)}}>수정</button>
                <button onClick={()=> DeletePost()}>삭제</button>
            </div>
            )}


            <div className="ReviewDetail-comments">

            <p className="comment-count">댓글 {comments.length}</p>

            <div className="comment-write">
                <textarea placeholder="댓글을 입력해주세요." value={comment} onChange={(e)=> setComment(e.target.value)}/>
                <button onClick={()=>{addComment()}}>등록</button>
            </div>

            <div className="comment-list">
                {comments.map((item)=>(
                <div className="comment-item" key={item.id}>
                    <h4>{item.user_public?.username}</h4>
                    <p>{item.content}</p>
                  <div className="delete-btn">
                    <h5>{new Date(item.created_at).toLocaleString()}</h5>
                    {item.user_id === user &&(
                    <button onClick={()=>{DeleteComments(item.id)}}><i className="fa-regular fa-x"></i></button>
                    )}
                  </div>
                </div>
                ))}
            </div>

            </div>
            
        </div>
    )
}
export default ReviewDetail