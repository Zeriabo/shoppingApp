import { Badge, Drawer } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { config } from "dotenv";
import { useSelector,useDispatch } from 'react-redux';
import styled from "styled-components";
import { RootState } from "../redux/app/store";
import { mobile } from "../responsive";
import { fetchUser, getHistory, logout, signin } from "../redux/reducers/userSlice";
import { ICartItem ,IProductToAdd} from "../types/types";
import Cart from "./Cart/Cart";
import History from "./History/History"
import { Avatar } from "@mui/material";
import { addProduct, addProductToCartDetails, checkOut, empty, removeProduct, removeProductFromCartDetails } from "../redux/reducers/cartDetailsSlice";
import HistoryIcon from '@mui/icons-material/History';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as ICartItem[]);
  const userState=useSelector((state:RootState)=>state.rootReducer.user); 
  const cart=useSelector((state:RootState)=>state.rootReducer.cartDetails); 
  const products=useSelector((state:RootState)=>state.rootReducer.products.products);
  const history= useSelector((state:RootState)=>state.rootReducer.user.history);

console.log(history)
  const signin= ()=>{
    window.open('http://localhost:5001/api/v1/users/auth/account/',"_self")
  }
   const signout= ()=>{
    dispatch(logout)
    window.open('http://localhost:5001/api/v1/users/logout',"_self")

  }


  
  return (
    <Container>
    <Wrapper>
      <Left>
        <Language>EN</Language>
        <SearchContainer>
          <Input placeholder="Search" />
          <Search style={{ color: "gray", fontSize: 16 }} />
        </SearchContainer>
      </Left>
      <Center>
        <Logo>ZShopping</Logo>
      </Center>
 
      {(userState.user.id!=undefined)?  null: <MenuItem onClick={()=>console.log("register")}>REGISTER</MenuItem>  }
        {(userState.user.id!=undefined)?   <Avatar
        alt={userState.user.name}
        src={userState.user.image}
        sx={{ width: 56, height: 56 }}
      />: <MenuItem onClick={()=>signin()}>SIGN IN</MenuItem>  }
       {(userState.user.id!=undefined)? <MenuItem onClick={()=>signout()}>LOGOUT</MenuItem>  :null }



       {(userState.user.id!=undefined)?      <MenuItem onClick={()=>  dispatch(getHistory(userState.cart.userId))}>
   <Drawer anchor='right' open={historyOpen}  onClose={() => setHistoryOpen(false)}>
        <History carts={history} view={function (clickedItem: ICartItem): void {
              throw new Error("Function not implemented.");
            } } cartTotal={undefined} paid={undefined} createdAt={undefined} updatedAt={undefined}             />
       </Drawer>

       <Badge badgeContent={history.length} color="primary" onClick={() => setHistoryOpen(true)}>
            <HistoryIcon />
          </Badge>
        </MenuItem> :null }





       {(userState.user.id!=undefined)?      <MenuItem>
 
   <Drawer anchor='right' open={cartOpen}  onClose={() => setCartOpen(false)} >
        <Cart 
              cartTotal={cart.total} addToCart={function (clickedItem: any): void {
                var productToadd: IProductToAdd = {
                  id: clickedItem.id,
                  title: clickedItem.title,
                  price: clickedItem.price,
                  discount: clickedItem.discount,
                  category: clickedItem.category,
                  description: clickedItem.description,
                  image: clickedItem.image,
                  cartId: userState.cart.id
                };
                dispatch(addProduct(productToadd));
                dispatch(addProductToCartDetails(productToadd));
              } } removeFromCart={function (clickedItem: ICartItem): void {
                var productToRemove: IProductToAdd = {
                  id: clickedItem.id,
                  title: clickedItem.title,
                  price: clickedItem.price,
                  discount: clickedItem.discount,
                  category: clickedItem.category,
                  description: clickedItem.description,
                  image: clickedItem.image,
                  cartId: userState.cart.id
                };
                dispatch(removeProduct(productToRemove));
                dispatch(removeProductFromCartDetails(productToRemove));
              } } cartItems={cart.cartItems} checkOut={function (): void {
                dispatch(checkOut(userState.cart.id))
                dispatch(empty())
              } }   />
              
       </Drawer>

       <Badge badgeContent={cart.cartItems.length} color="primary" onClick={() => setCartOpen(true)}>
            <ShoppingCartOutlined />
          </Badge>
        </MenuItem> :null }
   
     
    </Wrapper>
  </Container>
  );
};
export default Navbar;