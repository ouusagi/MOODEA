import React, { useState,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BestSlider from "./BestSlider";
import supabase from "../../supabaseClient";
import '../Recycling/category.css'


function HeaderSectionCategory({categoryName, titleBio, titleName, basePath}){

    const {page} = useParams()
    const nowpage = Number(page)

    let [item,setitem] = useState([]) 
    let [slider,setslider] = useState([])
    let navigate = useNavigate()

    // useEffect(()=>{
    //     fetch(jsonFile)
    //     .then(res=>res.json())
    //     .then(data =>{
    //         setitem(data[arrayName])
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // },[jsonFile,arrayName])

    useEffect(()=>{
        async function HeaderSectionCategoryPage() {
            const {data, error} = await supabase
            .from('ProductsDB')
            .select('*')
            .eq("category", categoryName)
            .order("id", { ascending: true });

            if(error){
                console.log(error)
            }

            else{
                setitem(data)
            }
        }
        
        HeaderSectionCategoryPage()
    },[categoryName])



    // useEffect(()=>{
    //     fetch(bestSliderFile)
    //     .then(res=> res.json())
    //     .then(data=>{
    //         setslider(data[bestSliderArray])
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // },[bestSliderFile,bestSliderArray])

    useEffect(()=>{
        async function BestSlider() {
            const {data, error} = await supabase
            .from('BestSlider')
            .select('*')
            .eq('category', categoryName)
            .order("id", { ascending: true });

            if(error){
                console.log(error)
            }

            else{
                setslider(data)
            }
        }

        BestSlider()
    },[categoryName])



    const Products = ()=>{
        let copy = [...item].sort((a,b)=> a.name.localeCompare(b.name))
        setitem(copy)
    }

    const Lowprice = ()=>{
        let copy = [...item].sort((a,b)=> a.price - b.price)
        setitem(copy)
    }

    const Highprice = ()=>{
        let copy = [...item].sort((a,b)=> b.price - a.price)
        setitem(copy)
    }

    const Random = ()=>{
        let copy = [...item].sort(()=> Math.random() - 0.5)
        setitem(copy)
    }

    const pageproductcount = 15
    const totalpage = Math.ceil(item.length / pageproductcount)
    const sliceditem = item.slice((nowpage - 1) * pageproductcount, nowpage * pageproductcount)


    return(
        <div className="SkincareList-bg">

        <div className="SkincareList-title-container">
            <h1>{titleName}</h1>
            <h2>{titleBio}</h2>
        </div>

        <BestSlider items={slider} categoryName={categoryName}/>

        <div className="itemarray-container">

        <div className="total">등록제품 : {item.length}개</div>

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
                    <img src={item.photo} alt="상품 이미지" onClick={() => navigate(`/product/${categoryName}/${item.id}`)}/>
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
               return <Link className="link" key={i} to={`/${basePath}/${i+1}`}>{i+1}</Link>
            })}
            </div>
            
            <div className="page-info">- {nowpage} 페이지 -</div>
        </div>


        </div>
    )

}














export default HeaderSectionCategory;