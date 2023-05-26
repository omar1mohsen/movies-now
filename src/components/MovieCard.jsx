import React, { useEffect, useState } from "react";
import { FaCross, FaHeart, FaRegHeart } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { UserAuth } from "../data/authContext/authContext";
import { db } from "../Firebase/firebase";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { movieState, showState } from "../Atom/model";
import Message from "./Message";

const MovieCard = ({ movie, title, del }) => {
  const { user } = UserAuth();
  const [like, setLike] = useState(false || movie.like);
  const [saved, setSaved] = useState(false || movie.saved);
  const movieId = doc(db, "users", `${user?.email}`);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useRecoilState(showState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  const saveMovie = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieId, {
        savedMovies: arrayUnion({
          id: movie.id,
          title: movie.title,
          image: movie.backdrop_path || movie.poster_path,
          like: true,
          saved: true,
        }),
      });
    } else {
      setMessage("Please login to save movies");
    }
  };

  return (
    <div
      className="relative h-28 min-w-[160px] cursor-pointer transition duration-200  ease-out md:h-36 md:min-w-[260px] !overflow-hidden 
    md:hover:scale-105"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path || movie.image
        }`}
        alt={movie.title}
        className="card-image "
      />

      <p
        className="absolute top-0 left-0 flex justify-center items-center w-full h-full md:text-sm font-semibold bg-black/80 opacity-0 hover:opacity-100 transition text-center !z-[50] movie-title"
        onClick={(e) => {
          if (e.target.classList.contains("movie-title")) {
            setCurrentMovie(movie);
            setShowModal(true);
          }
        }}
      >
        {movie.title}

        <div
          className="absolute top-2 right-4 flex items-center justify-center !z-[100] text-gray-400 like-btn h-10 w-10 justify-center items-center"
          onClick={() => {
            title === "My Shows" ? del(movie.id) : saveMovie();
          }}
        >
          {title === "My Shows" ? (
            <RxCross1 />
          ) : like ? (
            <FaHeart />
          ) : (
            <FaRegHeart />
          )}
        </div>
      </p>
      {message && <Message message={message} />}
    </div>
  );
};

export default MovieCard;
