import React from "react";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, addProductToCartDetails } from "../redux/reducers/cartDetailsSlice";
import { useSelect } from "@mui/base";
import { RootState } from "../redux/app/store";
import { ICartItem, IProductToAdd } from "../types/types";
import { nextTick } from "process";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ( item :any) => {

  const dispatch=useDispatch();
  const user = useSelector( (state: RootState) => state.rootReducer.user);

const userCart=user.cart
console.log(user)
  function addItemToCart(item: any): void {
    var itemToAdd:IProductToAdd={
      id: undefined,
      title: undefined,
      price: 0,
      discount: 0,
      category: undefined,
      description: undefined,
      image: undefined,
      cartId: 0
    }

    
  itemToAdd={
    id: item.id,
    title: item.title,
    price: item.price,
    category: item.category,
    description: item.description,
    image: item.image,
    discount:item.discount,
    cartId: userCart.id
  }

  if(userCart.id!=undefined)
  {
    dispatch(addProductToCartDetails(itemToAdd))
    dispatch(addProduct(itemToAdd))
  }else{
    throw new Error("The user does not have a cart")
  }

  }
  return (
    <Container>
      <Circle />
      <Image src={item.item.image}/>
     <Info>
        {(user.cart!=undefined)?<Icon onClick={()=>addItemToCart(item.item)} >
         <ShoppingCartOutlined />
        </Icon >:null}
        

        <Icon onClick={()=>alert("zooom")}>
          <SearchOutlined  />
        </Icon>
        <Icon onClick={()=>alert("like")}>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;


