import * as Sequelize from 'sequelize'
import internal from 'stream'
import { sequelize } from '../instances/sequelize'

export interface CategoryObject {
  name: string
  image: string
}
export interface CategoryAddModel {
  id: number
  name: string
  image: string
}

export interface CategoryModel
  extends Sequelize.Model<CategoryModel, CategoryAddModel> {
  id: number
  name: string
  image: string
}

export interface CategoryViewModel {
  name: string
  image: string
}
export const Category = sequelize.define<CategoryModel, CategoryAddModel>(
  'category',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    image: Sequelize.STRING,
  }
)
