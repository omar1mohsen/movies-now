import React from 'react'
import ComNav from '../components/ComNav'
import MyShowsRow from '../components/MyShowsRow'
import { useRecoilValue } from 'recoil'
import { showState } from '../Atom/model'
import Modal from "../components/Modal";
import Footer from '../components/Footer'

const Account = () => {
  const showModal = useRecoilValue(showState)
  return (
    <>
    <ComNav/>
      <div className='w-full text-white'>
        <img
          className='w-full h-[85vh] object-cover'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/51e53f54-0d9f-40ec-9e05-c030def06ac9/2eb9f18f-8df6-4c70-bf85-7e1b76d6a4b0/EG-en-20230515-popsignuptwoweeks-perspective_alpha_website_large.jpg'
          alt='/'
        />
        <div className='bg-black/60 absolute top-0 left-0 w-full h-[85vh]'></div>
        <div className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
        <MyShowsRow />
        {showModal && <Modal/>} 
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Account