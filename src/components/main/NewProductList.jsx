import { useState, useEffect } from 'react'
import supabase from '../../supabaseClient'


function NewProductList(){

    const count = 10
    const Maxcount = 30

    let [products,setProducts] = useState([]) 
    let [pluscount,setpluscount] = useState(count)

    // useEffect(()=>{
    //     fetch('/Newproducts-items.json')
    //     .then(res=>res.json())
    //     .then(data =>{
    //         setProducts(data.Newproducts)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // },[])

useEffect(() => {
  async function loadProducts() {
    const { data, error } = await supabase
      .from('Newproducts_items')
      .select('*')
    
    if (error){
       console.log(error)
    }
    else{
        setProducts(data)
    }
  }

  loadProducts()
}, [])


    const plusbtn = ()=> {
        setpluscount(now=> Math.min(now + count, Maxcount))
    }

    const pre = pluscount < Maxcount && pluscount < products.length
 
    

    return(

    <div className='newproduct-bg'>

        <div className="newproduct-title-container">
            <hr/>
            <h1>New Product</h1>
            <h2>새롭게 입고된 신상품들을 만나보세요</h2>
        </div>

        <div className='newproduct-box'>
            {products.slice(0, pluscount).map((item,i)=>(
            <div className='newproduct-item-container' key={i}>
                <div className='newproduct-item'>
                    <img src={item.photo} alt="상품 이미지" />
                    <div className="newproduct-text">
                    <h5>{item.brand}</h5>
                    <h3>{item.name}</h3>
                    <h4>{item.price.toLocaleString()}원</h4>
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
    </div>

    )
    
}







export default NewProductList