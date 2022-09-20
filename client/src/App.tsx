import React, { useState, useEffect } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './redux/reducers/productsSlice';
import { fetchCategories } from './redux/reducers/categoriesSlice';
import { RootState } from './redux/app/store';
import axios from 'axios';
import { is } from 'immer/dist/internal';
import { checkUserCart, fetchUser ,getHistory,logout} from './redux/reducers/userSlice';
import { empty, fetchCartDetails } from './redux/reducers/cartDetailsSlice';


function App() {
  const dispatch= useDispatch()
  const state = useSelector(
    (state: RootState) => state.rootReducer
  );  

  useEffect(() => {

     dispatch(fetchUser()).then((res:any)=>{
     dispatch(checkUserCart(res.payload))
     dispatch(fetchProducts()) 
     dispatch(fetchCategories())
  

    })

    //"{"cookie":{"originalMaxAge":86348941,"expires":"2022-09-16T09:00:55.660Z","httpOnly":true,"path":"/"},"passport":{"user":{"id":"108311505120611006087","name":"Zeriab Chiah","email":"zeriab.chiah@gmail.com","avatar":"https://lh3.googleusercontent.com/a-/AFdZucrMMjbBGUdznzPqm0drF5OpijTn-DiaijKY6xUx0A=s96-c"}}}"
  }, []
  )
  return (
 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home state={state} />}>
       
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
