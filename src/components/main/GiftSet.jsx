import React, { useState,useEffect } from "react";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";


function GiftSet(){

  const [Gift,setGift] = useState([])
  let navigate = useNavigate()

    // useEffect(()=>{
    //     fetch('/GiftSet.json')
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setGift(data.Gifts)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // },[])

    useEffect(()=>{
      async function GiftSet() {
        const {data, error} = await supabase
        .from('GiftSet')
        .select('*')

        if(error){
          console.log(error)
        }

        else{
          setGift(data)
        }
      }

      GiftSet()
    },[])


    return(
        <div className="Gift">

            <div className="GiftSet-text-container">
                <h1>Gift Set</h1>
                <h2>"마음을 담아 전하는 특별한 스킨케어 세트, 소중한 사람에게 전해보세요."</h2>
            </div>

            <div className="GiftSet-container">

                <div className="GiftSet-img-container">
                    <img src="./Gift.png" alt="넓은 산맥 배경에 장식되있는 화장품" />
                    <h2>중요한 날,<br />선물을 고민하고 있을 때 !</h2>
                    <p>사랑하는 사람에게<br />마음을 전하는 완벽한 선택.</p>
                    <button onClick={()=>{
                      navigate('/giftset/1')
                    }}>MORE GIFTSET</button>
                </div>

                <div className="GiftSet-item-container">

                  {Gift.map((item,i)=>{
                    return(
                    <div className="GiftSet-item" key={i}>
                      <div className="GiftSet-item-img-wrapper">
                        <img src={item.photo}/>
                      </div>
                      <div className="GiftSet-text">
                        <h3>{item.name}</h3>
                        <p>{item.bio}</p>
                        <h4>{item.price.toLocaleString()}원</h4>
                        <div className="GiftSet-text2">
                        <h5>BEST</h5>
                        <h5>NEW</h5>
                        </div>
                      </div>
                    </div>
                    )
                  })}

                    
                </div>
     
            </div>

        </div>
    )

}

export default GiftSet;