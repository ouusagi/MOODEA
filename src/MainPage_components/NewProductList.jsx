import { useState, useEffect } from 'react'
import './MainPage.css';


function NewProductList(){

    let [products,setProducts] = useState([]) 

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
    

    return(

        <div className='newproduct-box'>
            {products.map((item,i)=>(
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
        </div>

    )


}







export default NewProductList