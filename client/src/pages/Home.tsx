import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { ProductState } from "../redux/reducers/productSlice";
import { Badge, Drawer } from "@material-ui/core";
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from "../redux/app/store";
import { setZoomedImageOut } from "../redux/reducers/ZoomedImageSlice";
import Image from 'rc-image';
import InnerText from "../components/InnerText";


const Home = (fullState:any) => {
 const dispatch=useDispatch()
    const zoomedImage= useSelector((state:RootState)=>state.rootReducer.zoomedImage)
  console.log(zoomedImage)

  return (
    <div>
      <Announcement />
      <Navbar />
      <br />
      <Slider />
      {(fullState.state.categories!=undefined)?   <Categories categories={fullState.state.categories} />:null}
      <Drawer anchor='top' open={zoomedImage.zoom} onClickCapture={() => dispatch(setZoomedImageOut())} onClose={() => dispatch(setZoomedImageOut())}>
      <div className="zoomedpic">
    <div className="rightZoomed" >
    <Image src={zoomedImage.zoomedpic} width={800}  height={400} onClick={() => dispatch(setZoomedImageOut())}/>
    </div>
  <div className="leftZoomed">
     
     
  <InnerText image={zoomedImage} />
   
  
    </div>
  
     </div>
     
     
    </Drawer>
      <div id="products">
      <Products products={(fullState.state.products.filteredProducts.length>0)?fullState.state.products.filteredProducts:fullState.state.products.products}/>
      </div>
      <NewsLetter/>
      <Footer/>
    </div>
  );
};

export default Home;