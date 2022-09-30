import { client } from '../server'

const getUsers = async () => {
  const response = await client.query(
    'SELECT * FROM public."users" ORDER BY id ASC'
  )
  return response.rows
}

const getSingleUser = async (id: number) => {
  const response = await client.query(
    'SELECT * FROM public."users" where id= $1',
    [id]
  )
  return response.rows
}
const getUserByEmail = async (email: string) => {
  const response = await client.query(
    'SELECT * FROM public."users" where  email=$1',
    [email]
  )

  return response.rows
}
const createUser = async (newUser: any) => {
  const [firstname, lastname] = newUser.user.name.split(' ')

  client.query(
    'INSERT INTO  public."users"("firstname","lastname","email","passwordhash",admin) VALUES($1,$2,$3,$4,$5)',
    [firstname, lastname, newUser.user.email, null, newUser.user.admin ? 1 : 0],
    (err: Error, result: any) => {
      if (err) {
        console.log(err)
        return err
      } else {
        return result
      }
    }
  )
}
const deleteUser = async (id: number) => {
  const response = await client.query(
    'DELETE FROM public."users" where id= $1',
    [id]
  )
  return response.rowCount > 0
}
const updateUser = async (id: number, update: any) => {
  const toUpdate = await client.query(
    'SELECT * FROM public."users" where id= $1',
    [id]
  )

  if (toUpdate.rowCount > 0) {
    let firstName = update.firstName
    let lastName = update.lastName
    let mobile = update.mobile
    let email = update.email
    let password = update.password
    let admin = update.admin

    if (firstName == null) {
      firstName = toUpdate.rows[0].firstName
    }
    if (lastName == null) {
      lastName = toUpdate.rows[0].lastName
    }
    if (mobile == null) {
      mobile = toUpdate.rows[0].mobile
    }
    if (email == null) {
      email = toUpdate.rows[0].email
    }
    if (password == null) {
      password = toUpdate.rows[0].passwordHash
    }
    if (admin == null) {
      admin = toUpdate.rows[0].admin
    }
    client.query(
      'UPDATE  public."users" SET "firstname"=$1,"lastname"=$2,"mobile"=$3,"email"=$4,"passwordhash"=$5,"admin"=$6 where id= $7',
      [firstName, lastName, mobile, email, password, admin, id],
      (err: Error, result: any) => {
        if (err) {
          console.log(err)
          return err
        } else {
          return result
        }
      }
    )
  } else {
    console.log('User not found')
    return new Error('User not found')
  }
}
export default {
  getUsers,
  getSingleUser,
  getUserByEmail,
  createUser,
  deleteUser,
  updateUser,
}
