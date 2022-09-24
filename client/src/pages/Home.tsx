import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { ProductState } from "../redux/reducers/productSlice";


const Home = (fullState:any) => {
  console.log(fullState)
  return (
    <div>
      <Announcement />
      <Navbar />
      <br />
      <Slider />
      {(fullState.state.categories!=undefined)?   <Categories categories={fullState.state.categories} />:null}
   
      <div id="products">
      <Products products={(fullState.state.products.filteredProducts.length>0)?fullState.state.products.filteredProducts:fullState.state.products.products}/>
      </div>
      <NewsLetter/>
      <Footer/>
    </div>
  );
};

export default Home;