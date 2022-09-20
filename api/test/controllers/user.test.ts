import request from 'supertest'

import { User } from '../../src/models/User'
import app from '../../src/app'
import connect, { MongodHelper } from '../db-helper'
import { describe, test } from '@jest/globals';

import axios from 'axios';


describe("Get all users",()=>{
    test("return all the users",async ()=>{
    const res= await axios.get('http://localhost:5001/api/v1/users/')
    expect(res.status).toBe(201)
    })
})

describe("Get all users",()=>{
    test("return all the users",async ()=>{
    const res= await axios.get('http://localhost:5001/api/v1/users/getUser/4')
    expect(res.status).toBe(200)
    })
})
