import React, { useState,useEffect } from "react";


function SkincareList(){

    let [skincareitem,setskincareitem] = useState([]) 

    useEffect(()=>{
        fetch('/Skincare.json')
        .then(res=>res.json())
        .then(data =>{
            setskincareitem(data.Skincare)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const Products = ()=>{
        let copy = [...skincareitem].sort((a,b)=> a.name.localeCompare(b.name))
        setskincareitem(copy)
    }

    const Lowprice = ()=>{
        let copy = [...skincareitem].sort((a,b)=> a.price - b.price)
        setskincareitem(copy)
    }

    const Highprice = ()=>{
        let copy = [...skincareitem].sort((a,b)=> b.price - a.price)
        setskincareitem(copy)
    }

    const Random = ()=>{
        let copy = [...skincareitem].sort(()=> Math.random() - 0.5)
        setskincareitem(copy)
    }


    return(
        <div className="SkincareList-bg">

        <div className="SkincareList-title-container">
            <hr />
            <h1>Skincare</h1>
            <h2>피부를 위한 작은 쉼표를 더해보세요.</h2>
        </div>

        <div className="itemarray-container">

        <div className="total">등록제품 : {skincareitem.length}개</div>

        <div className="itemarray-box">
          <div className="itemarray" onClick={()=> Products()}>상품명순</div>
          <div className="itemarray" onClick={()=> Lowprice()}>낮은가격순</div>
          <div className="itemarray" onClick={()=> Highprice()}>높은가격순</div>
          <div className="itemarray" onClick={()=> Random()}>추천순</div>
        </div>

        </div>

        {/* <div className="items-hr"></div> */}



        <div className='skincare-box'>
            {skincareitem.map((item,i)=>(
            <div className='skincare-item-container' key={i}>
                <div className='skincare-item'>
                    <img src={item.photo} alt="상품 이미지" />
                    <div className="skincare-text">
                    <h5>{item.brand}</h5>
                    <h3>{item.name}</h3>
                    <h4>{item.price.toLocaleString()}원</h4>
                </div>
                </div>
            </div>
            ))}

        </div>


        </div>
    )

}














export default SkincareList;