import * as Sequelize from 'sequelize'
import internal from 'stream'
import { sequelize } from '../instances/sequelize'


export interface CartDetailsAddModel {
  id:number
  cartId: number
  productId:number
  quantity: number
  price: number
  discount: number
  createdAt: string
  updatedAt: string
}

export interface CartDetailsModel extends Sequelize.Model<CartDetailsModel, CartDetailsAddModel> {
    id:number
    cartId: number
    productId:number
    quantity: number
    price: number
    discount: number
    createdAt: string
    updatedAt: string
}

export interface CartDetailsViewModel {
    cartId: number
    productId:number
    quantity: number
    price: number
    discount: number
}
export const CartDetails = sequelize.define<CartDetailsModel, CartDetailsAddModel>('cartdetails', {
  id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  cartId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {         // User belongsTo Cart 1:1
      model: 'Cart',
      key: 'id'
    }
  },
  productId:{
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {         // User belongsTo Product 1:1
      model: 'Product',
      key: 'id'
    }
  },
  quantity: Sequelize.INTEGER,
  price: Sequelize.INTEGER,
  discount: Sequelize.INTEGER,
  createdAt: Sequelize.STRING,
  updatedAt: Sequelize.STRING,
})