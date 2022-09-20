import React, { FC, useState } from 'react'
import { useAppDispatch } from '../redux/app/hooks';

import {  setProductName } from '../redux/reducers/productNameSlice';

import {SearchProps} from '../types/types';



const Search : FC<SearchProps> =  (props) => {
const dispatch=  useAppDispatch()
const [name,setName]=useState("");
  const handleChange=(e: any)=>{
   setName(e.target.value)
  }
  const handleClick=(e:any)=>{
dispatch(setProductName(name))
   
  }
  return (
    <div>
        <div>
            <label>Search on title: </label>
        <input type="input" name="search"  onChange={handleChange}/>  
        <br />
        <button name="search" onClick={(e)=>{
            e.preventDefault();
           handleClick(e);
        }}  >Search</button>  
        </div>
     

    </div>
  )
}

export default Search