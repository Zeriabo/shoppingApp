import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { filterProducts } from "../redux/reducers/productsSlice";
import {Link} from 'react-scroll'
const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;



const CategoryItem = (item:any) => {
  const dispatch=useDispatch();
  function shopNow(item:any) {
    console.log(item.id)
    dispatch(filterProducts(item.id))
  }
  return (
    <Container>
      <Image src={item.item.image} />
      <Info>
        <Title>{item.item.name}</Title>
        <Link to="products" spy={true} smooth={true}>   <Button variant="contained" color="success" onClick={()=>shopNow(item.item)}>SHOP NOW </Button></Link>
      </Info>
    </Container>
  );
};

export default CategoryItem;


