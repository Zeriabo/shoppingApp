import * as Sequelize from 'sequelize'
import internal from 'stream'
import { sequelize } from '../instances/sequelize'

export interface CartObject {
  paid: boolean
  userId: number
}
export interface CartAddModel {
  id: number
  paid: boolean
  userId: number
  createdAt: string
  updatedAt: string
}

export interface CartModel extends Sequelize.Model<CartModel, CartAddModel> {
  id: number
  paid: boolean
  userId: number
  createdAt: string
  updatedAt: string
}

export interface CartViewModel {
  paid: boolean
  userId: number
  createdAt: string
  updatedAt: string
}
export const Cart = sequelize.define<CartModel, CartAddModel>('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  paid: Sequelize.BOOLEAN,
  userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         // User belongsTo User 1:1
        model: 'User',
        key: 'id'
      }
    },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})
