import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled,{ ThemeProvider } from "styled-components";
import Card from "../components/Card";
import MenuFull from "../components/Menu copy";
import Navbar from "../components/Navbar";
import { darkTheme, lightTheme } from "../utils/Theme";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  // gap: 10px;
  // margin-top: 10dvh;
  margin-left:40dvh;
  position:sticky;
  justify-content: space-between;

`;
const Main = styled.div`
  background-color: ${({ theme }) => theme.bg};
  display:flex;
  flex-wrap: wrap;
  position:absolute;
  min-height: 100dvh;
  width: 100%;
`;

const Wrapper = styled.div`
  display:flex;
  flex-wrap: wrap;  
  padding: 22px 25px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return(
    
  <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
  <MenuFull darkMode={darkMode} setDarkMode={setDarkMode} />
  <Container>
    
   <Main>
   <Wrapper>
    {videos.map(video=>(
      <Card key={video._id} video={video}/>
    ))}
    </Wrapper>
    </Main>
  </Container>
  </ThemeProvider>
  );
};

export default Search
