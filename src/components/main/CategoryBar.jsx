import { useState,useEffect } from 'react'


function CategoryBar(){
let [Category,setCategory] = useState([])

    useEffect(()=>{
        fetch('/Category.json')
        .then(res=>res.json())
        .then(data=>{
            setCategory(data.Category)
        })
        .catch(err=>{
            console.log(err)
        })
    })

    return(

        <div>
            <div className='CategoryBar-container'>

                <div className='CategoryBar-header'>
                    <h1>LATEST</h1>
                    <p>당신에게 꼭 맞는 뷰티아이템을 찾아보세요</p>
                    <hr />
                </div>

                <div className='CategoryBar-box'>
                    {Category.map((item,i)=>{
                        return(
                            <div className='CategoryBar-item' key={i}>
                                <img src={item.photo} alt="카테고리 제품별 이미지"/>
                                <h4>{item.Product}</h4>
                            </div>
                        )
                    })}
                </div>
                
            </div>
        </div>


    )


}











export default CategoryBar