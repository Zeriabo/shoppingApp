import React from "react";
import { FC } from "react";
import { useAppSelector } from '../redux/app/hooks';
import { RootState } from "../redux/app/store";

const ProductCard: FC<any>=(data:any)=>{
  const useSelector=  useAppSelector;
 const productName=useSelector((state:RootState)=>state.rootReducer.productName.value);

    return(data.data.title.includes(productName))?
       (
        <div className='cart'>
          <p>{data.data.category}</p>
          <p>{data.data.description}</p>
          <p>{data.data.price}</p>
          <p>{data.data.title}</p>
       </div>
      ):(
        <div></div>
      )
    
        
    
}
export default ProductCard