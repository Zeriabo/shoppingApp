import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { categories } from "./data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../redux/reducers/categoriesSlice";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;

const Categories = (categories:any) => {
  return (
    <Container>
      {categories.categories.categories.map((item:any) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;