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
  return (
    <div>
      <Announcement />
      <Navbar />
      <br />
      <Slider />
      <Categories categories={fullState.state.categories} />
      <div id="products">
      <Products products={(fullState.state.products.filteredProducts.length>0)?fullState.state.products.filteredProducts:fullState.state.products.products}/>
      </div>
      <NewsLetter/>
      <Footer/>
    </div>
  );
};

export default Home;