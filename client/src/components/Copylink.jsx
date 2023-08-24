import React from "react";
import styled from "styled-components";
import Menu from "./Menu";
import Response from "./Response";
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
  width: 500px;
  height: 300px;
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
  // font-weight:bold;
`;

const Input = styled.p`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  padding-top:0;
  height:40px;
  background-color: transparent;
  z-index: 999;
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

const Copylink = ({setOpen1, id}) => {

  // const handleUrlGeneration = async (e)=>{
  //   e.preventDefault();
  //   const res = await axios.get("/links")
  //   // res.status===200 && navigate(`/video/${res.data._id}`)
  // }

  const handleCopyClick =() => {
      navigator.clipboard.writeText(`http://localhost:3001/res/${id}`);
  }


  return (
    <>
      <Container>
        <Wrapper>
          <Close onClick={() => setOpen1(false)}>X</Close>
          <Title>Copy link</Title>
          <h6>Copy the link and share it with everyone from whome you would like to get a response</h6>

          <Input>http://localhost:3001/res/{id}</Input>

          <Button onClick={handleCopyClick}> Click here to copy the link </Button>
        </Wrapper>
      </Container>
      {/* {open&&<Response setOpen={setOpen}/>} */}
    </>
  );
};

    export default Copylink;