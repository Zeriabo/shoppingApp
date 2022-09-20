import React from 'react';
import Button from '@material-ui/core/Button';
// Types

// Styles
import { Wrapper } from './CartItem.styles';
import { ICartItem } from '../../types/types';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

type Props = {
  item: ICartItem;
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (clickedItem: ICartItem) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className='information'>
        <p>Price: ${item.price}</p>
        <p>Total: ${item.totalPrice}</p>
      </div>
      <div className='buttons'>
   
          <IconButton aria-label="delete" size="large" onClick={() => removeFromCart(item)}>
  <DeleteIcon fontSize="inherit" />
</IconButton>
          
  
        <p>{item.quantity}</p>
       
        <IconButton color="primary" aria-label="add to shopping cart"  onClick={() => addToCart(item)}>
  <AddShoppingCartIcon />
</IconButton>
      </div>
    </div>
    <img src={item.image} alt={item.title} />
  </Wrapper>
);

export default CartItem;