import React, { useEffect, useState } from "react";
import styled,{ ThemeProvider } from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import ResCard from "../components/Response card"
import { darkTheme, lightTheme } from "../utils/Theme";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10dvh;
  position:sticky;
  margin-left:40dvh;
  // align-items:center;
  

`;
const Main = styled.div`
  // flex: 7;
  background-color: ${({ theme }) => theme.bg};
  display:flex;
  flex-wrap: wrap;
  position:absolute;
  min-height: 90dvh;
  min-width: 100%;
`;
const Wrapper = styled.div`
  display:flex;
  flex-wrap: wrap;  
  padding: 22px 25px;
  align-content: flex-start;
`;


const ResponseHeadings = () => {
  const [response, setResponse] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchResponses = async () => {
      const res = await axios.get(`/links/`);
      setResponse(res.data);
    };
    fetchResponses();
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
    <Container>
    
    <Main>
    <Navbar />
    <Wrapper>
      {response.map((response) => (
        <ResCard key={response._id} response={response}/>
      ))}
      </Wrapper>
      </Main>
    </Container>
    </ThemeProvider>
  );
};

export default ResponseHeadings;
