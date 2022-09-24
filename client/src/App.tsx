import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './redux/reducers/productsSlice';
import { fetchCategories } from './redux/reducers/categoriesSlice';
import { RootState } from './redux/app/store';
import { checkUserCart, fetchUser, getHistory} from './redux/reducers/userSlice';



function App() {
  const dispatch= useDispatch()


  useEffect(() => {

     dispatch(fetchUser()).then((res:any)=>{
     dispatch(checkUserCart(res.payload))
     dispatch(fetchProducts()) 
     dispatch(fetchCategories())
     
    })
  }, []
  )
  const state = useSelector(
    (state: RootState) => state.rootReducer
  );  
  return (
 
    <BrowserRouter>
      <Routes>
        {(state.categories.categories!=undefined)?   <Route path="/" element={<Home state={state} />}></Route>:<Route path="/" element={<NoPage />}></Route>}

       
          <Route path="*" element={<NoPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
