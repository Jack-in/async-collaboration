import React, { useEffect, useState } from "react";
import styled,{ ThemeProvider } from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
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
  
`;


const Home = () => {
  const [videos, setVideos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/random`);
      setVideos(res.data);
    };
    fetchVideos();
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
    <Container>
    
    <Main>
    <Navbar />
    <Wrapper>
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
      </Wrapper>
      </Main>
    </Container>
    </ThemeProvider>
  );
};

export default Home;
