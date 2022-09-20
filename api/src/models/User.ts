import * as Sequelize from 'sequelize'
import { sequelize } from '../instances/sequelize'


export interface UserAddModel {
  id:number,
  firstName: string,
  lastName: string,
  mobile:string,
  email: string,
  passwordHash:string,
  admin:number,
  lastLogin:Date,
  createdAt: string,
  updatedAt: string,
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
    id:number,
    firstName: string,
    lastName: string,
    mobile:string,
    email: string,
    passwordHash:string,
    admin:number,
    lastLogin:Date,
    createdAt: string,
    updatedAt: string,
}

export interface UserViewModel {
  id: number
  firstName: string,
    lastName: string,
  mobile:string,
    email: string,
    admin:number,
    lastLogin:Date,
}
export const User = sequelize.define<UserModel, UserAddModel>('user', {
  id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  mobile: Sequelize.NUMBER,
  email:Sequelize.NUMBER,
  passwordHash:Sequelize.STRING,
  admin:Sequelize.INTEGER,
  lastLogin:Sequelize.DATE,
  createdAt:Sequelize.DATE,
  updatedAt:Sequelize.DATE

})