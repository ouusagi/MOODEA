import { useState, useEffect } from "react"
import App from "../../App"
import supabase from "../../supabaseClient"
import './ReviewBoard.css'
import { useNavigate } from "react-router-dom"

function ReviewBoard(){


    return(
        <div>

            <div className="ReviewBoard-bg">

                <div className="ReviewBoard-title">
                    <div>
                    <p className="ReviewBoard-title-p1">리뷰 게시판</p>
                    <p className="ReviewBoard-title-p2">(2 Post)</p>
                    </div>
                    
                    <div className="abs-box">
                    <input className="Search-box" type="text" placeholder="Search" />
                    <i className="fa-solid fa-magnifying-glass Review-Search"></i>
                    </div>
                </div>

                <div className="ReviewBoard-banner-container">
                    <div className="ReviewBoard-banner-Contents">
                    <div><p>No</p></div>
                    <div><p>제목</p></div>
                    <div><p>작성자</p></div>
                    <div><p>작성일</p></div>
                    <div><p>조회수</p></div>
                    <div><p>좋아요</p></div>
                    </div>
                </div>

                <div className="ReviewBoard-Post-box">
                    <div className="ReviewBoard-Post-list">
                    <div><p>1</p></div>
                    <div><p>샴푸 너무 좋아서 리뷰남겨요 !!</p></div>
                    <div><p>HAKO</p></div>
                    <div><p>2025-11-25</p></div>
                    <div><p>30</p></div>
                    <div><p>2</p></div>
                    </div>


                    <div className="ReviewBoard-Post-list">
                    <div><p>2</p></div>
                    <div><p>바디워시 한달 사용 솔직 리뷰 ㅠㅠ</p></div>
                    <div><p>laus24</p></div>
                    <div><p>2025-11-25</p></div>
                    <div><p>17</p></div>
                    <div><p>2</p></div>
                    </div>
                </div>

                <div className="post-btn"><button>글쓰기</button></div>

                <div className="page-num-container">
                    <div className="page-num-box">
                    -
                    <div><p>1</p></div>
                    <div><p>2</p></div>
                    <div><p>3</p></div>
                    <div><p>4</p></div>
                    <div><p>5</p></div>
                    -
                    </div>
                </div>
            
            </div>

        </div>
    )
}
export default ReviewBoard