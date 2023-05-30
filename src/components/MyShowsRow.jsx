import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { db } from "../Firebase/firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { UserAuth } from "../data/authContext/authContext";

// handle scrolll arrows

const MyShowsRow = ({ title }) => {
  const [movies, setMovies] = useState([]);
  const [scrolling, setScrolling] = useState(false);
  const { user } = UserAuth();
  const movieRef = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    onSnapshot(movieRef, (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  const rowRef = useRef(null);

  const handleClick = (dir) => {
    setScrolling(true);

    const { scrollLeft, clientWidth } = rowRef.current;

    const scrollTo =
      dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;

    rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };
  const delMovie = async (movieId) => {
    try {
      const result = movies.filter((movie) => movie.id !== movieId);
      setMovies(result);
      await updateDoc(movieRef, {
        savedMovies: result,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {movies?.length === 0 ? null : (
        <div className="h-40 space-y-0.5  md:pt-4 lg:pt-0 md:space-y-2 ">
          <h2 className="w-56 cursor-pointer text-sm font-semibold md:text-2xl transition duration-[var(--main-animate)] text-[#e5e5e5] hover:text-[var(--text-color)]">
            {title}
          </h2>
          <div className="group relative md:-ml-2">
            <FaChevronCircleLeft
              className={`row-btn left-4 ${!scrolling && "hidden"}`}
              onClick={() => handleClick("left")}
            />
            <div
              ref={rowRef}
              className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide movies-groups md:space-x-2.5 md:p-2"
            >
              {movies &&
                movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    title={title}
                    del={delMovie}
                    movie={movie}
                  />
                ))}
            </div>
            <FaChevronCircleRight
              className="row-btn right-4"
              onClick={() => handleClick("right")}
            />
          </div>
          {/*group*/}
        </div>
      )}
    </>
  );
};

export default MyShowsRow;
