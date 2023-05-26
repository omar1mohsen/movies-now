import React, {  useEffect, useRef, useState } from "react";
import axios from 'axios';
import MovieCard from "./MovieCard";
import { FaChevronCircleRight , FaChevronCircleLeft } from "react-icons/fa";

const Row = ({title , data}) => {

const [rowMovies,setRowMovies] = useState([])

  useEffect( ()=>{
     const fectchData = async ()=>{
     await axios.get(data).then((res)=>{
      setRowMovies(res.data.results)
   }) 
  }
  fectchData()  
 
})
// handle scrolll arrows
const [scrolling,setScrolling] = useState(false)
const rowRef = useRef(null)

const handleClick = (dir)=>{
  setScrolling(true)

  const {scrollLeft,clientWidth} = rowRef.current

  const scrollTo = 
    dir === 'left'?
    scrollLeft - clientWidth :
    scrollLeft + clientWidth ;

  rowRef.current.scrollTo({left:scrollTo,behavior:'smooth'})

 // scrollLeft === clientWidth  ? setScrolling(false):setScrolling(true);

}


  return (
    <>
    <div className="h-40 space-y-0.5 md:pt-4 lg:pt-0 md:space-y-2">
    <h2 className="w-56 cursor-pointer text-sm font-semibold md:text-2xl transition duration-[var(--main-animate)] text-[#e5e5e5] hover:text-[var(--text-color)]" >{title}</h2>
    <div className="group relative md:-ml-2">
        <FaChevronCircleLeft className={`row-btn left-4 ${!scrolling && 'hidden'}`}  onClick={()=>handleClick('left')}/>
        <div 
        ref={rowRef}
        className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide movies-groups md:space-x-2.5 md:p-2">
        {rowMovies && rowMovies.map((movie)=> (
            <MovieCard key={movie.id} movie = {movie} />
        ))}
        </div>
        <FaChevronCircleRight className="row-btn right-4" onClick={()=>handleClick('right')}/>
    </div>{/*group*/}
    </div>
    </>
  )
}

export default Row