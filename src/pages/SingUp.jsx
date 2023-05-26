import React, { useState } from "react";
import ComNav from "../components/ComNav";
import { Link,useNavigate } from "react-router-dom";
import { UserAuth } from "../data/authContext/authContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SingUp = () => {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[ermail,setErmail]=useState(null)
  const[erpass,setPass]=useState(null)
  const [userErr ,setUsererr] = useState('')
  const {user,SingUp} = UserAuth()
  const[showpass,setShowPass] = useState(false)
const navigate = useNavigate()

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const checkEmail = (event)=>{

    if (!isValidEmail(event.target.value)) {
      setErmail('Please enter a valid email.');
    } else {
      setErmail(null);
    }
    setEmail({...email,email:event.target.value})
  }

const checkPassword = (e)=>{
  if(e.target.value.length < 6 || e.target.value.length > 60  ){
    setPass('Your password must contain between 6 and 60 characters.');
  } else {
    setPass(null);
  }
  setPassword({...password,password:e.target.value})
}

const handleSingUp = async (e)=>{
  e.preventDefault();
  setUsererr('')
  if(password.password && email.email ){
  try {
    await SingUp(email.email,password.password)
    navigate('/')
  }catch(error){
  
  setUsererr(error.message)
  }
  }else{
    setUsererr('Please Check Your Password And Username')
  }
  }

  const handleShowPass = ()=>{
    showpass ? setShowPass(false)  : setShowPass(true)  ;
  }
  

  return (
    <>
      <ComNav />
      <div className="h-full w-screen page-image">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/51e53f54-0d9f-40ec-9e05-c030def06ac9/2eb9f18f-8df6-4c70-bf85-7e1b76d6a4b0/EG-en-20230515-popsignuptwoweeks-perspective_alpha_website_large.jpg
      "
          alt="page cover"
          className="hidden sm:block z-[-10] absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] min-h-[500px] mx-auto bg-black/75 text-white rounded">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sing Up</h1>
              {userErr?<p className="bg-red-500/80 my-2 py-2 px-2 rounded transition-all duration-200 " >{userErr}</p>:null}
              <form onSubmit={handleSingUp} className="w-full flex flex-col py-2">
              <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="rounded bg-stone-800 my-2 p-3"
                  onChange={checkEmail}
                  
                />
                {ermail && <p className="text-[#e87c03] text-[13px] pb-2 px-1">{ermail}</p>}
                <div className="relative w-full">
                <input
                  type={`${showpass ? "text" : "password"}`}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="rounded bg-stone-800 my-2 p-3 relative w-full"
                  onChange={checkPassword}
                />
                {showpass ? 
                <AiFillEyeInvisible className="absolute top-6 text-black/70 right-5 z-10 cursor-pointer hover:text-black transition h-5 w-5" onClick={handleShowPass}/>
                :  
                <AiFillEye className="absolute top-6 text-black/70 right-5 z-10 cursor-pointer hover:text-black transition h-5 w-5" onClick={handleShowPass}/>
                 }
                
                </div>
                {erpass && <p className="text-[#e87c03] text-[13px] pb-2 px-1 ">{erpass}</p>}
                <button 
                className="bg-red-600 rounded py-3 my-6 hover:bg-red-800 transition font-bold text-xl">
                  Sign Up
                </button>


              <div className=" flex items-center justify-between">
                <p className=" text-stone-600 text-sm"><input type="checkbox" id="remember"/> <label htmlFor="remember"> Remember me</label> </p>
                <p className="hover:underline text-stone-600 text-sm cursor-pointer" >Need Help?</p>
              </div>
              <p className="capitalize py-8 " ><span className="text-sm text-slate-600">already subscribed to movies?</span> {''}
              <Link  to='/login'>sing in</Link>
              </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingUp