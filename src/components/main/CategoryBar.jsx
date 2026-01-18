import { useState,useEffect } from 'react'
import supabase from '../../supabaseClient'
import { useNavigate } from 'react-router-dom'
import CategoryBarSkeleton from '../Recycling/CategoryBarSkeleton'

function CategoryBar(){
let [Category,setCategory] = useState([])
let navigate = useNavigate()
const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        async function CategoryBar() {
            setIsLoading(true)
            const {data, error} = await supabase
            .from('Category')
            .select('*')

            if(error){
                console.log(error.message)
            }
            else{
                setCategory(data)
            }
            setIsLoading(false)
        }
        CategoryBar()
    },[])


    return(

        <div>
            <div className='CategoryBar-container'>

                <div className='CategoryBar-header'>
                    <h1>LATEST</h1>
                    <p>당신에게 꼭 맞는 뷰티아이템을 찾아보세요</p>
                    <hr />
                </div>

                <div className='CategoryBar-box'>
                    {isLoading ? (<CategoryBarSkeleton count={8}/>) : (
                    Category.map((item,i)=>{
                        return(
                            <div className='CategoryBar-item' key={i} onClick={()=>{
                                navigate(`/${item.basePath}`)
                            }}>
                                <img src={item.photo} alt="카테고리 제품별 이미지"/>
                                <h4>{item.Product}</h4>
                            </div>
                        )
                    }))}
                </div>
                
            </div>
        </div>


    )


}











export default CategoryBar