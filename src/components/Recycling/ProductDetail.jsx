import { useParams } from "react-router-dom";
import supabase from "../../supabaseClient";
import { useEffect, useState } from "react";
import '../Recycling/ProductDetail.css'

function ProductDetail({ tableName }) {

    let [products,setproducts] = useState(null)
    let {id} = useParams()
    let [saveinfo, setsaveinfo] = useState(0)
    let [itemcount, setitemcount] = useState(1)

    useEffect(()=>{
        async function fetchData() {
            const {data, error} = await supabase
            .from(tableName)
            .select('*')
            .order('id', {ascending: true})
            .eq('id', id)
            .single()

        if(error){
            console.log(error)
        }
        else{
            setproducts(data)
        }
        }

        fetchData()
    },[id,tableName])

    if(!products) return <p>상품 정보를 불러오는 중 입니다..</p>


  return (
    <div className="bg">
    <div className="product-detail">
      <div className="product-detail-img">
        <img src={products.photo} alt="상품 이미지"/>
      </div>

      <div className="product-detail-info">
        <h2>{products.name}</h2>
        <h3>{products.brand}</h3>
        <p className="price">{products.price.toLocaleString()}원</p>
        <hr />
        <p className="delivery">배송비	2,500원 (50,000원 이상 구매 시 무료)</p>
        <p className="info">{products.info}</p>

        <div className="count-btn-container">
            <button onClick={()=>{
              if(itemcount > 1){
              setitemcount(prev=> prev - 1)
              }
            }}>-</button>
            <span>{itemcount}</span>
            <button onClick={()=>{
              setitemcount(prev=> prev + 1)
            }}>+</button>
            <h4>Total {(products.price * itemcount).toLocaleString()}원</h4>
        </div>
        

      <div className="product-detail-btn">
        <button onClick={()=>{
          alert("로그인 후 이용 가능합니다.")
        }}>BUY IT NOW</button>
        <button onClick={()=>{
          alert("로그인 후 이용 가능합니다.")
        }}>CART</button>
        <button onClick={()=>{
          alert("로그인 후 이용 가능합니다.")
        }}><p>WISH LIST</p></button>
      </div>
      
      </div>

    </div>


        <div className="product-detail-box-info">
            <button className={saveinfo == 0 ? 'active' : ''} onClick={()=>{
              setsaveinfo(0)
            }}>상세정보</button>
            <button className={saveinfo == 1 ? 'active' : ''} onClick={()=>{
              setsaveinfo(1)
            }}>구매후기</button>
            <button className={saveinfo == 2 ? 'active' : ''} onClick={()=>{
              setsaveinfo(2)
            }}>반품/교환</button>
            <button className={saveinfo == 3 ? 'active' : ''} onClick={()=>{
              setsaveinfo(3)
            }}>Q&A</button>
        </div>

        <div className="product-detail-box-content">
          {saveinfo === 0 && <div>상세정보</div>}
          {saveinfo === 1 && <div>구매후기</div>}
          {saveinfo === 2 && <div>반품/교환</div>}
          {saveinfo === 3 && <div>Q&A</div>}
        </div>

</div>
    
  );
}

export default ProductDetail;