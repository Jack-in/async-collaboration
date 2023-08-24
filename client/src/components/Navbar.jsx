import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Upload from "./Upload";

const Container = styled.div`
 position: fixed;
 left:0;
 width:100%;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 10dvh;
`;
const Hhh = styled.h2`
color:${({ theme }) => theme.text};
alignItems:right;
display: flex;
font-family: "Brush Script MT", cursive; 
font-weight: bold;
font-style: italic;
`
const Searchicon = styled.image`
color:${({ theme }) => theme.text};
margin-right:50px;
cursor:pointer;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  // justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: fit-content;
  position: sticky;
  //left: 0px;
 //right: 0px;
  margin: 0;
  display: flex;
  align-items: center;
  // margin-left: auto;
  // justify-content: space-between;
 padding: 5px;
 
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};

`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const navigate = useNavigate()
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  // const data = JSON.parse(localStorage.getItem('persist:root'));
  // var currentUser=undefined
  // if(data)
  // {
  //  currentUser = JSON.parse(data.user).currentUser;
  // }

  // console.log(currentUser)
  return (
    <>
      <Container>
        
       
        <Wrapper>
        <Hhh> 
           Async. collaboration
        </Hhh>
        
          <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
        {currentUser ? (
          <>
          <Search>
            <Input style={{}}
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            
          </Search>
          <Searchicon onClick={()=>navigate(`/search?q=${q}`)}> 
             <SearchOutlinedIcon/>
          </Searchicon>
          
            <User>
              <Avatar src={currentUser.img} />
              {currentUser.name}
            </User>
            </>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
          </div>
        </Wrapper>
       
      </Container>
    </>
  );
};

export default Navbar;
