import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Menu from "./Menu";
import Copylink from "./Copylink";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
//   align-items: flex-start;
  z-index: 1;
  
`;

const Wrapper = styled.div`
  width: 400px;
  height: 500px;
  background-color: oldlace;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  border-radius: 10px;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h4`
  text-align: center;
  
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
  padding-top:0px;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;

const Response = ({setOpen,setOpen1,setId}) => {
  const [inputs, setInputs] = useState({});
  
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCreate = async (e)=>{
    e.preventDefault();
    const res = await axios.post("/links", inputs)
    setId(res.data._id)  
    // setOOpen(false)
    if(res.status===200)
    {
      setOpen(false);
      setOpen1(true);

    }
  }

    return (
        <>
        <Container>
          <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Create response link</Title>

            <h7 style={{fontWeight:"bold"}}>Describe more about how the response must be...</h7>

            <Input
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
            <Desc
              placeholder="Description"
              name="desc"
              rows={8}
              onChange={handleChange}
            />
        
            <Button onClick={handleCreate} >Create</Button>
          </Wrapper>
        </Container>
        </>
      );
    };
    export default Response;