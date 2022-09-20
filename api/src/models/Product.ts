import * as Sequelize from 'sequelize'
import internal from 'stream'
import { sequelize } from '../instances/sequelize'

export interface ProductAddModel {
  id: number
  title: string
  description: string
  category: number
  image: string
  price: number
  discount: number
  quantity: number
  createdAt: string
  updatedAt: string
}

export interface ProductModel
  extends Sequelize.Model<ProductModel, ProductAddModel> {
  id: number
  title: string
  description: string
  category: string
  image: string
  price: number
  discount: number
  quantity: number
  createdAt: string
  updatedAt: string
}

export interface ProductViewModel {
  id: number
  title: string
  description: string
  category: string
  image: string
  price: number
  discount: number
  quantity: number
  createdAt: string
  updatedAt: string
}
export const Product = sequelize.define<ProductModel, ProductAddModel>(
  'product',
  {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    category:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         // User belongsTo Category 1:1
        model: 'Category',
        key: 'id'
      }
    },
    image: Sequelize.STRING,
    price: Sequelize.NUMBER,
    discount: Sequelize.NUMBER,
    quantity: Sequelize.NUMBER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }
)
