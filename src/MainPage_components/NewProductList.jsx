import { useState, useEffect } from 'react'
import './MainPage.css';


function NewProductList(){

    const count = 10
    const Maxcount = 30

    let [products,setProducts] = useState([]) 
    let [pluscount,setpluscount] = useState(count)

    useEffect(()=>{
        fetch('/Newproducts-items.json')
        .then(res=>res.json())
        .then(data =>{
            setProducts(data.Newproducts)
        })
        .catch(err=>{
            console.log(err)
        })
    })

    const plusbtn = ()=> {
        setpluscount(now=> Math.min(now + count, Maxcount))
    }

    const pre = pluscount < Maxcount && pluscount < products.length
 
    

    return(

        <div className='newproduct-box'>
            {products.slice(0, pluscount).map((item,i)=>(
            <div className='newproduct-item-container' key={i}>
                <div className='newproduct-item'>
                    <img src={item.photo} alt="상품 이미지" />
                    <div className="newproduct-text">
                    <h5>{item.brand}</h5>
                    <h3>{item.name}</h3>
                    <h4>{item.price}</h4>
                </div>
                </div>
            </div>
            ))}

            {pre && (
            <div className='btn-container'>
            <button className='showbtn' onClick={()=> plusbtn()}>LOAD MORE PRODUCT</button>
            </div>
            )}

        </div>

    )
    
}







export default NewProductList