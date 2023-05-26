import React  from "react";
import Hero from "../components/Hero";
import Row from "../components/Row.jsx";
import data from "../data/data";
import Nav from "../components/Nav.jsx";
import { UserAuth } from "../data/authContext/authContext";
import MyShowsRow from "../components/MyShowsRow";
import {showState} from '../Atom/model';
import Modal from "../components/Modal";
import { useRecoilValue } from "recoil";
import Footer from "../components/Footer";

const Home = () => {

  const {user} = UserAuth()
  const showModal = useRecoilValue(showState)
  return (
    <>
    <Nav />
      <main className="relative pb-24 pl-4 lg:space-y-24 lg:pl-16">
        <Hero />

        <section className="md:space-y-16 pt-10 md:pt-0">
          <Row title="Trending Now" data={data.fetchTrending} />
          <Row title="Top Rated" data={data.fetchTopRated} />
          <Row title="Action Movies" data={data.fetchActionMovies} />
          <Row title="Comedy Movies" data={data.fetchComedyMovies} />
          {user?.email && (
              <MyShowsRow title = 'My Shows' />
          )}

          <Row title="Documentaries" data={data.fetchDocumentaries} />
          <Row title="Horror Movies" data={data.fetchHorrorMovies} />
          <Row title="Romance Movies" data={data.fetchRomanceMovies} />
          <Row title="Netflix Originals" data={data.fetchNetflixOriginals} />
        </section>
      </main>
       {showModal && <Modal/>} 
       <Footer/>
    </>
  );
};

export default Home;
