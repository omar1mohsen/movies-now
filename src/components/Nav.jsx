import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch, BsBellFill , BsPersonFill } from "react-icons/bs";
import { UserAuth } from "../data/authContext/authContext";
const Nav = () => {
  const [isScroll, setisScroll] = useState(false);
  const { user, logOut } = UserAuth();
  const navigate = useNavigate()


const handleLogout = ()=>{
  document.querySelector('.drop-menu').classList.add('hidden')
  logOut()
  navigate('/')
}

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setisScroll(true);
    } else {
      setisScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);
  
  return (
    <header className={`${isScroll && "bg-[#141414]/80"}`}>
      <div className="flex items-center space-x-2 md:space-x-10 ">
        <img
          src={require("../assests/logo.webp")} 
          alt="website logo"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <ul className="hidden items-center font-normal space-x-4 md:flex">
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex font-light text-sm space-x-2 justify-center items-center  ">
        <Link to="/search">
          <BsSearch className="sm hidden h-6 w-6 sm:inline" />
        </Link>

        <BsBellFill className="hidden sm:flex h-6 w-6" />

        <div className="relative">
          {user?
          <div className="h-10 w-10 rounded-[50%] font-bold text-xl bg-slate-600 cursor-pointer flex items-center justify-center text-white uppercase "
          onClick={()=>{
            user && document.querySelector('.drop-menu').classList.toggle('hidden')
          }}
          >
           <BsPersonFill className="h-6 w-6" />
          </div>
           : 
          <Link to="/singup">
            <img
          src="https://rb.gy/g1pwyx"
          alt=" login pic"
          className="cursor-pointer rounded "
        /></Link>
          }
            <div className={`drop-menu hidden font-semibold absolute bottom-[-170%] left-[-150%]`} >
              <span className="px-4 py-1 rounded mb-0.5 block bg-white/60 text-black hover:font-bold hover:bg-white transition hover:text-black/70">
                <Link to="/account">Account</Link>
              </span>
              <span className="px-4 py-1  rounded mb-0.5 block bg-white/60 text-black hover:font-bold hover:bg-white transition hover:text-black/70">
                <Link
                onClick={handleLogout}
                >
                  Logout
                </Link>
              </span>
            </div>
          
        </div>

      </div>
    </header>
  );
};
export default Nav;
