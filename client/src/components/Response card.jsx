import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  margin: 15px;
  cursor: pointer;
  display: flex;
  // margin:0;
  border-style:solid;
  border-width:2px;
  border-color:${({ theme }) => theme.soft};
 border-radius:5px;
 flex-direction: row;
`;
const Details = styled.div`
flex-direction: column;
padding:10px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  word-break: normal;
  overflow-wrap: anywhere;
  color: ${({ theme }) => theme.text};
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const ResCard = ({response}) => {

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Link to={`/link/${response._id}`} style={{ textDecoration: "none" }}>
      <Container>
        <Details>
            <Title>{response.title}</Title>
            <Info> {formatDate(response.createdAt)}</Info> 
        </Details>

      </Container>
     </Link>
  );
};

export default ResCard;