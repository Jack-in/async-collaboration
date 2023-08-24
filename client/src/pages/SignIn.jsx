import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled,{ThemeProvider} from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import { darkTheme, lightTheme } from "../utils/Theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  color: ${({ theme }) => theme.text};
  margin-left:40dvh;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
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

const SignIn = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false);

  
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
            navigate("/")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  //TODO: REGISTER FUNCTIONALITY


  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
      <Navbar />
    <Container>
      <Wrapper>
        <Title>Sign in</Title>      
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
      </Wrapper>
    </Container>
    </ThemeProvider>
  );
};

export default SignIn;
