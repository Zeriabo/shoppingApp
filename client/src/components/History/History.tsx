import React from 'react'
import { ICart, ICartItem } from '../../types/types';
import { Wrapper } from './History.styles';


type Props = {
  carts: ICart[] ;
  cartTotal:number |undefined;
  paid:boolean |undefined;
  createdAt:string|undefined;
  updatedAt:string|undefined;
  view: (clickedItem: ICartItem) => void;

};

const History: React.FC<Props> = ({ carts, view }) => {

  return (
    <Wrapper>
      <h2>Your History</h2>
    <table>
      <tr>
      <th>CartId</th>
      <th>product</th>
      <th>price</th>
      <th>Date</th>
      </tr>
 
  {carts.map((item:any) => {
    return[
      <tr>
      <td>{item.cartid}</td>
      <td>{(item.title)}</td>
      <td>{(item.price)}</td>
      <td>{new Date(item.created_at).toLocaleDateString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })}</td>
      </tr>
    ]
  }
   
      )}

    
      </table>
      <h2>Total: {carts.length}</h2>
      <h2>Total Purchases: {carts.reduce((accumulator, obj:any) => { return accumulator + obj.price;},
  0)}</h2>
    </Wrapper>
  );
};

export default History;
