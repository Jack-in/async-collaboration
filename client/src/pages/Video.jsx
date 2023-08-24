import React, { useEffect, useState } from "react";
import styled,{ ThemeProvider } from "styled-components";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import MenuFull from "../components/Menu copy";
import { darkTheme, lightTheme } from "../utils/Theme";
const Container = styled.div`
  display: flex;
  // gap: 24px;
  position: satic;
 // margin-top: 10dvh;
 margin:0;
 margin-left:40dvh;
 min-height:100dvh;
 
`;
const Main = styled.div`
  width:100%;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 95px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  word-break: normal;
  overflow-wrap: anywhere;
  color: ${({ theme }) => theme.text};
`;


const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
  align-items: flex-end;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-end;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 400;
`;

const Description = styled.p`
  font-size: 14px;
  word-break: normal;
  overflow-wrap: anywhere;
  color: ${({ theme }) => theme.text};
`;

const VideoFrame = styled.video`
  height: 85dvh;
  width: 100%;
  object-fit: cover;
  border-radius:10px;
`;

const Video = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

 
  const handleShare = () => {
    const videoLink = window.location.href;
    navigator.clipboard.writeText(videoLink);
    setIsCopied(true);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <MenuFull darkMode={darkMode} setDarkMode={setDarkMode} />
    <Container style={{}}>
    
    <Main>
    {/* <Navbar /> */}
    <Wrapper>
      <Content>
        <VideoWrapper >
          <VideoFrame  src={currentVideo && currentVideo.videoUrl} controls />
        </VideoWrapper>
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <Title style={{padding:"0", margin:"0"}}><h4>{currentVideo &&currentVideo.title}</h4></Title>
              <ChannelName>{channel.name} • <Info>
           {currentVideo && formatDate(currentVideo.createdAt)}
          </Info></ChannelName>              
            </ChannelDetail>
          </ChannelInfo>
          <Buttons>
            <Button onClick={handleShare}>
             <ReplyOutlinedIcon /> {isCopied ? "Copied!" : "Copy link"}
             </Button>
          </Buttons>
        </Channel>
        <Hr />
        <Description>{currentVideo &&currentVideo.desc}</Description>
        <Hr />
        <Comments videoId={currentVideo &&currentVideo._id} />
      </Content>
      </Wrapper>
      </Main>
    </Container>
    </ThemeProvider>
  );
};


export default Video;
