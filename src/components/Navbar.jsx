import React, { use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import userImg from "../assets/user.png";
import { AuthContext } from "../routes/AuthProvider";
const Navbar = () => {
  const  {user , logout} = use(AuthContext)
  // console.log(name)
const navigate = useNavigate()

  const handleLogout = () =>{
    logout().then(()=>{
      console.log('Logged out')
      navigate('/')
    })
    .catch(error => {
      console.log(error.message)
    })
  }
  return (
    <div className="flex justify-between items-center py-2">
      <div className=""></div>
      <div className="nav flex gap-5 text-accent">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/career">Career</NavLink>
      </div>
      <div className="login-btn flex gap-5">
        <img src={userImg} alt="" />
        {
          user ? 
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
          :
          <Link to='/auth/login' className="btn btn-primary px-10 ">Login</Link>
        }
      </div>
    </div>
  );
};

export default Navbar;
