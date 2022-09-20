import React from 'react'
import Button from '@material-ui/core/Button';
// Types
import { ICartItem } from '../../types/types';
// Styles
import { Wrapper } from './Item.styles';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';

type Props = {
  item: ICartItem;
  handleAddToCart: (clickedItem: ICartItem) => void;
  viewItem: (clickedItem: ICartItem) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart ,viewItem}) => (
  <div>


  <Wrapper>
    
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <h4>${item.price}</h4>
      <h5>Discount: {item.discount}</h5>
      <h3>Total:€{item.price-(item.price*item.discount/100)}</h3>
    </div>
    <div className="btn-group">
    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => handleAddToCart(item)}>
  <AddShoppingCartIcon />
</IconButton>

<VisibilityIcon onClick={() => viewItem(item)}> </VisibilityIcon>
  
    </div>
  </Wrapper>
  </div>
);

export default Item;

