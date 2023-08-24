import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LamaTube from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import EmergencyRecordingOutlinedIcon from '@mui/icons-material/EmergencyRecordingOutlined';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import '../dropDown.css';
import VideoStableIcon from '@mui/icons-material/VideoStable';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import {  useNavigate } from "react-router-dom";
import Response from "./Response";
import Copylink from "./Copylink";
const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 90dvh;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  top:10dvh;
  position:fixed;
  width:40dvh;
  justify-content:center;
  
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  // font-family: Verdana, sans-serif;
  letter-spacing:1px;
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [id, setId] = useState("");
  // if (document.cookie.indexOf('session=') === -1) {
  //   localStorage.clear();
  //   document.cookie = 'session=1';
  // }
 
  // const data = JSON.parse(localStorage.getItem('persist:root'));
  // var currentUser=undefined
  // if(data)
  // {
  //  currentUser = JSON.parse(data.user).currentUser;
  // }
  
console.log(currentUser)

  return (
    <>
    <Container>
    {currentUser &&
      <Wrapper>
      <Item onClick={()=>navigate(`/record`)} style={{marginTop:"20px",marginBottom:"20px"}}>
        <EmergencyRecordingOutlinedIcon/>
        Create Recording
      </Item>
      <Item style={{marginTop:"20px",marginBottom:"20px"}}  onClick={()=>setOpen(true)}>
        <AssessmentOutlinedIcon/>
        Collect Responses
      </Item>
        
        <Hr />
        <div class="dropdown">
        <nav>
        <label for="touch"><span ><VideoLibraryOutlinedIcon />
          <text style={{paddingLeft:"10px"}}>Library </text></span></label>               
        <input type="checkbox" id="touch"/> 

        <ul class="slide">
          <li ><a href="/"><VideoStableIcon />
          <text style={{paddingLeft:"10px"}} >Your Recordings </text></a></li> 
          <li ><a href='link'><SlideshowIcon />
          <text style={{paddingLeft:"10px"}} >All Responses</text></a></li>
        </ul>
        </nav> 
        </div>
          
        <Hr />
        <Item onClick={() => setDarkMode(!darkMode)} style={{bottom:"0", position:"absolute"}}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
      }
      {(!currentUser)&&
      <>
      <Login style={{display:"flex",flexDirection: "column", alignItems: "center",
      justifyContent: "center"}}>
      <h4 style={{textAlign:"center"}} >Welcome!</h4>
      <h6 style={{textAlign:"center"}}>Sign-in to begin collaborating asynchornously.</h6>
      <Link to="signin" style={{ textDecoration: "none" }}>
        <Button >
          <AccountCircleOutlinedIcon />
          SIGN IN
        </Button>
      </Link>
    </Login>
    <Item onClick={() => setDarkMode(!darkMode)} style={{bottom:"0", position:"absolute",  padding: "18px 26px"}}>
    <SettingsBrightnessOutlinedIcon />
    {darkMode ? "Light" : "Dark"} Mode
    </Item>
    </>
    }

    </Container>
    {open && <Response setOpen={setOpen} setOpen1={setOpen1} setId={setId}/>}
    {open1 && <Copylink setOpen1={setOpen1} id={id} />}
    </>    
  );
};

export default Menu;
