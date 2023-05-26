import React, {  useEffect, useState } from "react";
import axios from 'axios';
import data from "../data/data";
import {FaPlay } from 'react-icons/fa'
import { BsInfoCircleFill} from 'react-icons/bs'
import { useRecoilState } from "recoil";
import { showState} from "../Atom/model";
import { movieState} from "../Atom/model";

const Hero = () => {

const [movies,setMovies] = useState([])
// const [loading,setLoading] = useState(false)
const movie = movies[ Math.floor(Math.random() * movies.length) ] 

const [showModal,setShowModal] = useRecoilState(showState)
const [currentMovie,setCurrentMovie] = useRecoilState(movieState)



  useEffect( ()=>{
     const fectchData = async ()=>{
     await axios.get(data.allMovies).then((res)=>{
       setMovies(res.data.results)
   }) 
  }
  fectchData()  
  
},[])


return (
    movie && (
    <div className="hero flex flex-col space-y-2 ps-2 pt-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
        <div className="w-full h-full absolute top-0 left-0 z-[-10] ">
            <img 
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
             alt={movie.title} 
             className="hero-image"
             />
        </div>

        <h1 className="text-2xl lg:text-5xl md:text-4xl" >        
        {movie?.title || movie?.name  || movie?.original_name }       
        </h1>
        <p className="max-w-45 text-xs md:max-w-lg  md:text-lg lg:max-w-2xl  lg:text-2xl" >{ movie?.overview.substr(0,200)}...</p>
        <div className="mt-3 flex space-x-3">
          <button className="hero-btn text-black bg-white"><FaPlay className="h-4 w-4"/> Play</button>
          <button className="hero-btn bg-[gray]/70 "onClick={
            ()=>{
            setCurrentMovie(movie)
            setShowModal(true)
          }
          } >More Info <BsInfoCircleFill className="h-4 w-4"/> </button>
        </div>
    </div>
    )
  )
}

export default Hero