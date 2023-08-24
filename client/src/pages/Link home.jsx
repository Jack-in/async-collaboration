import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Menu from "../components/Menu";
import Response from "../components/Response";
import { VideoRecorder } from "./videoRecord";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #d7d7d7;
  display: flex;
  align-items: center;
  justify-content: center;
//   align-items: flex-start;
  z-index: 1;
  
`;

const Wrapper = styled.div`
  max-width: 500px;
  // height: 300px;
  background-color: #ededed;
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
const Title = styled.h5`
  text-align: left;
  // color: #555;
  // font-weight:bold;
  padding-bottom:20px;
`;
const Hh4 = styled.h4`
  text-align: left;
  padding:0;
  margin:0;
  word-break:normal;
  overflow-wrap:anywhere;
`;
const Hh6 = styled.h6`
  text-align: left;
  padding-bottom:20px;
  margin:0;
  word-break:normal;
  overflow-wrap:anywhere;
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
  border-radius: 10px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: #444;
  color: white;
 
`;
const Button1 = styled.button`
  border-radius: 10px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: #444;
  color: white;
  width:fit-content;
  align-items:left;
 
`;
const Label = styled.label`
  font-size: 14px;
`;

const ResHome = () => {
  const path = useLocation().pathname.split("/")[2];
  const [linkData, setLinkData] = useState();
  const [name, setname] = useState();
  const [showVideoComponent, setShowVideoComponent] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

useEffect(()=>{
  const deriveLink = async ()=>{
    const res = await axios.get(`/links/${path}`)
    res.status===200 && setLinkData(res);
    console.log(res)
  }
  deriveLink()
},[])
useEffect(()=>{
const deriveName = async()=>{
    const res1 = await axios.get(`/users/find/${(linkData.data.userId)}`)
    console.log(res1.data.name)
    setname(res1.data.name)
  }
  deriveName()
},[linkData]) 

const handleClick = () => {
  
  setShowVideoComponent(true);

};

if (showVideoComponent) {
  if(!currentUser)
  {
    return <SignIn/>
  }
  else
  return linkData&&<VideoRecorder linkData={linkData}/>
}

  return (
    <>
     {linkData && name && (
      <Container>   
        <Wrapper>
          <Title>Record a response to {name}</Title>
          <Hh4>{(linkData.data.title)}</Hh4>
          <Hh6>{(linkData.data.desc)}</Hh6>

          <Button onClick={handleClick}> Click here to record your response </Button>
          {/* <Button onClick={deriveName}> Click here to record your response </Button> */}
        </Wrapper>
      
      </Container>
      )}
      {/* {open&&<Response setOpen={setOpen}/>} */}
    </>
  );
};

const SignIn = () => {

  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  return (
    <Container >
      <Wrapper >
      <Hh4>You are not signed-in!</Hh4>
      <Title>Please, sign-in using your google account</Title>       
        <Button1 onClick={signInWithGoogle}>Signin</Button1>
      </Wrapper>
    </Container>
  );
};

    export default ResHome;