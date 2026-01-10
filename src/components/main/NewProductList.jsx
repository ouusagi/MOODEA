import { useState, useEffect } from 'react'
import supabase from '../../supabaseClient'
import { useNavigate } from 'react-router-dom'


function NewProductList(){

    const count = 10
    const Maxcount = 30

    let [products,setProducts] = useState(null) 
    let [pluscount,setpluscount] = useState(count)
    let navigate = useNavigate()

    useEffect(() => {
    async function loadProducts() {
    const { data, error } = await supabase
      .from('Newproducts_items')
      .select('*')
      .order('id', {ascending : true})
    
    if (error){
       console.log(error.message)
    }
    else{
        setProducts(data)
    }
  }
  loadProducts()
}, [])

if(!products) return <p>상품 정보를 불러오는 중 입니다..</p>


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
                    <img src={item.photo} alt="상품 이미지" onClick={()=>{
                        navigate(`/newproduct/${item.id}`)
                    }}/>
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