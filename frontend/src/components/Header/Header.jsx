import React, {  useState } from 'react'
import { Link } from 'react-router-dom';
import "./Header.css";

import {Home,HomeOutlined,Add,AddOutlined,SearchOutlined,Search,AccountCircle,AccountCircleOutlined} from "@mui/icons-material";

const Header = () => {
  const [tab,setTab] = useState(window.location.pathname);
  
  return (      
    <div className='header'>
        <Link to="/" onClick={() => setTab("/")}>
           {tab === "/" ? <Home style={{color:"#202020"}} /> : <HomeOutlined/>}
        </Link>
        <Link to="/newpost" onClick={() => setTab("/newpost")}>
        {tab === "/newpost" ? <Add style={{color:"#202020"}} /> : <AddOutlined/>}
        </Link>
        <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? <Search style={{color:"#202020"}} /> : <SearchOutlined/>}
        </Link>
        <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? <AccountCircle style={{color:"#202020"}} />: <AccountCircleOutlined/>}
        </Link>
    </div>
  )
}

export default Header;