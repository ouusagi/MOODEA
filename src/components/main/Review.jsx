import React, { useState,useEffect } from "react";
import supabase from "../../supabaseClient";




function Review(){

   let [Review,setReview] = useState([])

   // useEffect(()=>{
   //    fetch('/Review.json')
   //    .then(res=> res.json())
   //    .then(data=>{
   //       setReview(data.Reviews)
   //    })
   //    .catch(err=>{
   //       console.log(err)
   //    })
   // },[])

   useEffect(()=>{
      async function Review() {
         const {data, error} = await supabase
         .from('Reviews')
         .select('*')

         if(error){
            console.log(error)
         }

         else{
            setReview(data)
         }
      }
      Review()
   },[])

    
    return(
        <div className="Review-bg">

            <div className="Review-title-container">
                <div className="Review-title-box">
                <h1>Reviews</h1>
                <h2>“MOODÉA를 경험한 고객님들의 진솔한 후기를 만나보세요."</h2>
                </div>
                <button className="Reviwmore-btn">모든 후기보기<i className="fa-solid fa-angle-right"></i></button>
            </div>
            

            <div className="Review-container">  
               {Review.map((item,i)=>(                  
               <div className="Review-box" key={i}>

                   <div className="Review-imgbox">
                      <img src={item.photo} alt="" />
                   </div>

               <div className="Review-textbox">
                       <h3>{item.review}</h3>
                       <h4>상품 : {item.name}</h4>
                       <h5>{item.userid}</h5>
                       <p>★★★★★</p>
                     <div className="Review-textbox-miniimg">
                        <img src={item.miniphoto} alt=""  />
                     </div>
               </div>

                </div>                  
               ))}
            </div>

        </div>
    )

}














export default Review;