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
  const state = useSelector(
    (state: RootState) => state.rootReducer
  );  

  useEffect(() => {
    console.log("dispatching")
     dispatch(fetchUser()).then((res:any)=>{
     dispatch(checkUserCart(res.payload))
     dispatch(fetchProducts()) 
     dispatch(fetchCategories())
     
    })
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
