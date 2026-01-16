import { useState, useEffect } from "react"
import App from "../../App"
import supabase from "../../supabaseClient"
import './ReviewBoard.css'
import { useNavigate, useParams, Link } from "react-router-dom"

function ReviewBoard(){

    let navigate = useNavigate()
    let [user,setUser] = useState(null)
    let [review,setReview] = useState([])
    let [comments,setComments] = useState([])
    let [search,setSearch] = useState("")
    const filteredReview = review.filter((item)=> item.title.toLowerCase().includes(search.toLowerCase()))
    const {page} = useParams()
    const nowpage = Number(page) || 1
    const pagepostcount = 10
    const totalpage = Math.ceil(filteredReview.length / pagepostcount)
    const slidepost = filteredReview.slice((nowpage - 1) * pagepostcount, nowpage * pagepostcount)

    useEffect(()=>{
        async function Userdata() {
            const {data:UserData, error:UserError} = await supabase.auth.getUser()
            // if(UserError){console.log(UserError.message); alert("유저 세션을 불러오는 도중 에러가 발생하였습니다"); return;}
            setUser(UserData.user.id)
        }
        Userdata()
    },[])

    useEffect(()=>{
        async function ReviewList() {
            const {data:ReviewData, error:ReviewError} = await supabase
            .from("Reviews_Post")
            .select(`*, user_public (username)`)
            .order("created_at", {ascending:false})
            if(ReviewError){console.log(ReviewError.message); alert("에러가 발생하였습니다"); return;}
            setReview(ReviewData)
        }
        ReviewList()
    },[])

    useEffect(()=>{
        async function ReviewComment() {
            const {data: commentData, error: commentError} = await supabase
            .from("Reviews_comments")
            .select("*")
            if(commentError){console.log(commentError.message); return;}
            setComments(commentData)
        }
        ReviewComment()
    },[])

    const ReviewCheck = async ()=>{
        if(!user){console.log("유저 정보가 없습니다"); alert("로그인 후 이용 가능합니다."); navigate("/login"); return;}
        const {data:ReviewData, error:ReviewError} = await supabase
        .from("Orders")
        .select("id")
        .eq("user_id",user)
        .limit(1)
        if(ReviewError){console.log(ReviewError.message); alert("구매 정보 확인 중 오류 발생"); return;}
        if(ReviewData.length === 0){alert("구매한 상품이 없어 리뷰를 작성할 수 없습니다."); return;}
        navigate("/reviewpost");
    }




    return(
        <div>

            <div className="ReviewBoard-bg">

                <div className="ReviewBoard-title">
                    <div>
                    <p className="ReviewBoard-title-p1">리뷰 게시판</p>
                    <p className="ReviewBoard-title-p2">({review.length} Post)</p>
                    </div>
                    
                    <div className="abs-box">
                    <input className="Search-box" type="text" placeholder="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                    <i className="fa-solid fa-magnifying-glass Review-Search" onClick={()=>{setSearch(search)}}></i>
                    </div>
                </div>

                <div className="ReviewBoard-banner-container">
                    <div className="ReviewBoard-banner-Contents">
                    <div><p>No</p></div>
                    <div><p>제목</p></div>
                    <div><p>작성자</p></div>
                    <div><p>작성일</p></div>
                    <div><p>조회수</p></div>
                    <div><p>댓글</p></div>
                    </div>
                </div>

                <div className="ReviewBoard-Post-box">
                    {review.length == 0 ? (<p className="No-review">작성된 리뷰가 없습니다</p>) :
                    filteredReview.length == 0 ? (<p className="No-review">검색결과에 일치한 리뷰가 없습니다.</p>) : (
                    slidepost.map((item,index)=>{
                    return(
                    <div className="ReviewBoard-Post-list" key={item.id} onClick={()=>{navigate(`/reviewdetail/${item.id}`)}}>
                    <div><p>{filteredReview.length - ((nowpage - 1) * pagepostcount + index)}</p></div>
                    <div><p>{item.title}</p></div>
                    <div><p>{item.user_public?.username}</p></div>
                    <div><p>{new Date(item.created_at).toLocaleDateString()}</p></div>
                    <div><p>{item.view_count}</p></div>
                    <div><p>{comments.filter(c => c.review_id === item.id).length}</p></div>
                    </div>
                    )
                    }))
                    }
                </div>

                <div className="post-btn"><button onClick={()=>{ReviewCheck()}}>글쓰기</button></div>

                <div className="page-num-container">
                    <div className="page-num-box">
                        {Array.from({length : totalpage}, (_,i)=>{
                            return <Link key={i} className="link" to={`/reviewboard/${i+1}`}>{i+1}</Link>
                        })}
                    </div>

                    <div className="now-page-info">- {nowpage} 페이지 -</div>
                </div>
            
            </div>

        </div>
    )
}
export default ReviewBoard