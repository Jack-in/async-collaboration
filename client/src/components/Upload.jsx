import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 60dvh;
  height: fit-content;
  background-color: #d7d7d7;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  border-radius: 10px;
  // height: fit-content;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h3`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
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
  background-color: #444;
  color: white;
`;
const Label = styled.label`
  font-size: 14px;
`;
const Upload = ({ setOpen,recordedVideo,coverImage,linkData }) => {
  const [img, setImg] = useState(coverImage);
  const [video, setVideo] = useState(recordedVideo);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const path = useLocation().pathname.split("/")[2];

  const navigate = useNavigate()

  useEffect(() => {
    if(path && linkData)
    {
      setInputs({title: linkData.linkData.data.title,
        desc: linkData.linkData.data.desc,
        linkId: path
      })
    }
  }, []);
  

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
 
  
  if(video)
  {
    console.log("video")
  }
  else
  console.log("no video")

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + (file.name || 'untitled-' + Math.random().toString(36).substring(2, 9));
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video , "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  useEffect(() => {
    if(path&&linkData&&video&&img&&videoPerc===100)
    {
      handleUpload()
      console.log("runn")
    }
    
  }, [inputs]);


  const handleUpload = async ()=>{
    const res = await axios.post("/videos", {...inputs, tags})
    setOpen(false)
    // setOOpen(false)
    res.status===200 && navigate(`/video/${res.data._id}`)
  }

  return (
    <>
    {linkData && path &&(
       <Container>
       <Wrapper style={{height:"30dvh", backgroundColor:"transparent",color:"white"}}>
       <Title>Uploading..... {videoPerc + "%"}</Title>
       {/* <Label>Video: {"Uploading:" + videoPerc + "%"} </Label> */}
       {/* <Button onClick={handleUpload}>Upload</Button> */}
       </Wrapper>
       </Container>
)}
{!path&&(
    <Container>
      <Wrapper>
        <Close onClick={()=>setOpen(false)}>X</Close>
        <Title>Video description</Title>
        {/* <Label>Video:</Label> */}
        <>
          {"Uploading: " + videoPerc + "%" }
        </>
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
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
    )}
    </>
  );
};

export default Upload;
