import React, { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { movieState, showState } from "../Atom/model";
import { RxCross1 } from "react-icons/rx";
import { FaPlay } from "react-icons/fa";
import { HiOutlineHandThumbUp, HiHandThumbUp } from "react-icons/hi2";
import {
  BsBookmarkPlusFill,
  BsBookmarkPlus,
  BsFillVolumeUpFill,
  BsVolumeMuteFill,
} from "react-icons/bs";
import { API_KEY } from "../data/data";
import ReactPlayer from "react-player";
import { UserAuth } from "../data/authContext/authContext";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { CircularProgress } from "@mui/material";
import Message from "./Message";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(showState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState([]);
  const [mute, setMute] = useState(false);
  const [saved, setSaved] = useState(false || movie.saved);
  const [liked, setLiked] = useState(false || movie.like);
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { user } = UserAuth();
  const movieId = doc(db, "users", `${user?.email}`);

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${
          movie?.id
        }?api_key=${API_KEY}&language=en-US&append_to_response=videos`
      ).then((res) => res.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (e) => e.type === "Trailer"
        );
        setTrailer(data.videos.results[index].key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
      setLoading(false);
    };
    fetchMovie();

    onSnapshot(movieId, (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [movie]);

  const saveMovie = async () => {
    if (user?.email) {
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
      // alert("Please login to save movies");
      setMessage("Please login to save movies");
    }
  };

  const delMovie = async (movieTitle) => {
    try {
      setSaved(false);
      const result = movies.filter((movie) => movie.title !== movieTitle);
      setMovies(result);
      await updateDoc(movieId, {
        savedMovies: result,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-red-600 rounded-md"
    >
      <>
        <button
          onClick={handleClose}
          className="modal-btn absolute top-4 right-6 md:top-6 md:right-10 h-6 w-6 md:h-9 md:w-9 !z-40 border-none bg-[#181818] hover:bg-[#181818] "
        >
          <RxCross1 className="w-6 h-6" />
        </button>

        <div className="relative pt-[100%] md:pt-[56.25%]">
          {loading ? (
            <div className="w-[100%] md:h-[100%] h-[10vh]  absolute top-0 left-0 flex justify-center items-center">
              <CircularProgress className="w-10 h-10 block" color="secondary" />
            </div>
          ) : (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: "-1",
              }}
              playing
              muted={mute}
            />
          )}

          <div className="absolute bottom-10  flex w-full items-center justify-between px-10">
            <div className="flex space-x-3 left-btns">
              <button className=" flex gap-x-2 items-center rounded bg-white md:px-8 px-4 text-black md:text-xl font-bold transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-3 w-3 text-black" />
                Play
              </button>

              <button
                className="modal-btn p-2"
                onClick={() => {
                  saved === true ? delMovie(movie?.title) : saveMovie();
                }}
              >
                {saved ? (
                  <BsBookmarkPlusFill className="h-5 w-5" />
                ) : (
                  <BsBookmarkPlus className="h-5 w-5 text-white" />
                )}
              </button>
              <button
                className="modal-btn "
                onClick={() => {
                  setLiked(!liked);
                }}
              >
                {liked ? (
                  <HiHandThumbUp className="h-5 w-5" />
                ) : (
                  <HiOutlineHandThumbUp className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
            {/*/<!-- left-btns -->*/}
            <div className="">
              <button
                className="modal-btn"
                onClick={() => {
                  setMute(!mute);
                }}
              >
                {mute ? (
                  <BsVolumeMuteFill className="h-5 w-5" />
                ) : (
                  <BsFillVolumeUpFill className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {Math.floor(movie?.vote_average * 10)}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-16 gap-y-4 font-light md:flex-row">
              <p className="md:w-5/6">{movie?.overview ? movie.overview : 'No Data To Show'}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{" "}
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{" "}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
        {message && <Message message={message} />}
      </>
    </MuiModal>
  );
};

export default Modal;
