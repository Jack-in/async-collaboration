import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import ResHome from "./pages/Link home";
import ResponseHeadings from "./pages/All responses";
import IndividualResponses from "./pages/IndividualResponses";
import { VideoRecorder } from "./pages/videoRecord"
import { useSelector } from "react-redux";
import Response from "./components/Response";



function App() {
  
  const { currentUser } = useSelector((state) => state.user);

  return (
    
    <BrowserRouter>    
              <Routes>
                <Route path="/">
                 <Route path="record" element={<VideoRecorder/>}/>
                  <Route index element={<Home/>} />
                  <Route path="search" element={<Search />} />
                  <Route
                    path="signin"
                    element={currentUser ? <Home/> : <SignIn />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                 
                    <Route path="res" element={<ResHome/>} />
                    <Route path="res/:id" element={<ResHome/>} />
                    <Route path="link" element={<ResponseHeadings/>}/>
                    <Route path="link/:id" element={<IndividualResponses/>}/>
                </Route>
              </Routes>
    </BrowserRouter>
  );
}

export default App;
