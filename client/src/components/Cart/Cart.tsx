import { Button } from '@mui/material';
import React from 'react'
import { ICartItem } from '../../types/types';
import CartItem from '../CartItem/CartItem';
import { Wrapper } from './Cart.styles';


type Props = {
  cartItems: ICartItem[];
  cartTotal:number;
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (clickedItem: ICartItem) => void;
  checkOut: () => void;
};

const Cart: React.FC<Props> = ({ cartItems,cartTotal, addToCart, removeFromCart ,checkOut}) => {
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${cartTotal}</h2>
      
   {(cartItems.length>0)?
   <Button   onClick={checkOut }  variant="contained" color="success">
      Check Out
     </Button>:null}
    </Wrapper>
  );
};

export default Cart;
