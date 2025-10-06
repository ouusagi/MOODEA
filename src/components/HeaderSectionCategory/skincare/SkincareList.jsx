import React, { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BestSlider from "../../Recycling/BestSlider";
import supabase from "../../../supabaseClient";


function SkincareList(){

    const {page} = useParams()
    const nowpage = Number(page)

    let [skincareitem,setskincareitem] = useState([]) 
    let [slider,setslider] = useState([])

    // useEffect(()=>{
    //     fetch('/Skincare.json')
    //     .then(res=>res.json())
    //     .then(data =>{
    //         setskincareitem(data.Skincare)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // },[])

    useEffect(()=>{
        async function Skincare() {
            const {data, error} = await supabase
            .from('Skincare')
            .select('*')

            if(error){
                console.log(error)
            }

            else{
                setskincareitem(data)
            }
        }

        Skincare()
    },[])

    // useEffect(()=>{
    //     fetch('/BestSliderSkincare.json')
    //     .then(res=> res.json())
    //     .then(data=>{
    //         setslider(data.BestSliderSkincare)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // },[])

    useEffect(()=>{
        async function BestSliderSkincare() {
            const {data, error} = await supabase
            .from('BestSliderSkincare')
            .select('*')

            if(error){
                console.log(error)
            }

            else{
                setslider(data)
            }
        }

        BestSliderSkincare()
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

    const pageproductcount = 15
    const totalpage = Math.ceil(skincareitem.length / pageproductcount)
    const sliceditem = skincareitem.slice((nowpage - 1) * pageproductcount, nowpage * pageproductcount)


    return(
        <div className="SkincareList-bg">

        <div className="SkincareList-title-container">
            <h1>Skincare</h1>
            <h2>피부를 위한 작은 쉼표를 더해보세요.</h2>
        </div>

        <BestSlider items={slider}/>

        <div className="itemarray-container">

        <div className="total">등록제품 : {skincareitem.length}개</div>

        <div className="itemarray-box">
          <div className="itemarray" onClick={()=> Products()}>상품명순</div>
          <div className="itemarray" onClick={()=> Lowprice()}>낮은가격순</div>
          <div className="itemarray" onClick={()=> Highprice()}>높은가격순</div>
          <div className="itemarray" onClick={()=> Random()}>추천순</div>
        </div>

        </div>


        <div className='skincare-box'>
            {sliceditem.map((item,i)=>(
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

        <div className="pagination">
            <div className="page-num">
            {Array.from({length : totalpage}, (_,i)=>{
               return <Link className="link" key={i} to={`/skincare/${i+1}`}>{i+1}</Link>
            })}
            </div>
            
            <div className="page-info">- {nowpage} 페이지 -</div>
        </div>


        </div>
    )

}














export default SkincareList;