import React from 'react'
import dp from '../assets/dp.webp'
import { IoCameraOutline } from 'react-icons/io5';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';

import { setUserData } from '../redux/userSlice';
import { serverUrl } from '../main';




function Profile() {
  let navigate=useNavigate()
  let {userData}=useSelector(state=>state.user)
  let dispatch=useDispatch()
  let [name,setName]=useState(userData.name||"")
  let [frontendImage,setFrontendImage]=useState(userData.image || dp)
  let [backendImage,setBackendImage]=useState(null)
  let image=useRef()
  let [saving,setSaving]=useState(false)

  const handleImage=(e)=>{
    let file=e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))

  }

  const handleProfile=async(e)=>{
    setSaving(true)
    e.preventDefault()
    try {
      let formData= new FormData()
      formData.append("name",name)
      if(backendImage){
        formData.append("image",backendImage)
      }

      let res = await axios.put(`${serverUrl}/api/user/profile`,formData,
        {withCredentials:true}
      )
      setSaving(false)
      dispatch(setUserData(res.data))
    } catch (error) {
      console.log(error)
      setSaving(false)
    }

  }
  return (
    <div className='w-full h-screen bg-slate-200 flex flex-col
    justify-center items-center gap-5'>
      <div className='fixed top-5 left-5 cursor-pointer'>
        <IoIosArrowBack className='w-[50px] h-[50px]' onClick={()=>
          navigate("/")
        }/>
      </div>
        <div className=' bg-white rounded-full
        border-4 border-[#20c7ff] shadow-gray-400 shadow-lg
        relative' onClick={()=>image.current.click()} >
           <div className='w-[200px] h-[200px] overflow-hidden
           rounded-full flex justify-center items-center '>
             <img src={frontendImage} alt='' className='h-full'/>
           </div>
          <div className='absolute bottom-4 text-gray-700 right-5 w-[35px] h-[35px]
          rounded-full bg-[#20c7ff] flex justify-center items-center shadow-gray-400 shadow-lg'>
             <IoCameraOutline className='text-gray-700 w-6.5 h-6.5'/>
          </div>
        </div>
        <form className='w-[95%]  max-w-[500px] flex flex-col
        gap-5 items-center justify-center' onSubmit={handleProfile}>
          <input type='file' accept='image/*' ref={image} hidden onChange={handleImage}/>
            <input type='text' placeholder='Enter your name' className='w-[90%] h-[50px] outline-none
          border-2 border-[#20c7ff] px-5 py-2.5 bg-[white] rounded-lg
          shadow-gray-400 shadow-lg text-gray-800 text-[19px]'
          onChange={(e)=>{
            setName(e.target.value)}} value={name}/>
          <input type='text' readOnly className='w-[90%] h-[50px] outline-none
          border-2 border-[#20c7ff] px-5 py-2.5 bg-[white] rounded-lg
          shadow-gray-400 shadow-lg text-gray-400 text-[19px]' value={userData?.userName}/>
          <input type='email' readOnly className='w-[90%] h-[50px] outline-none
          border-2 border-[#20c7ff] px-5 py-2.5 bg-[white] rounded-lg
          shadow-gray-400 shadow-lg text-gray-400 text-[19px]' value={userData?.email}/>
          <button className='px-5 py-2.5 bg-[#20c7ff] rounded-2xl
          shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-5 font-semibold
          hover:shadow-inner cursor-pointer' disabled={saving}>{saving?"Saving...":"Save Profile"}</button>


        </form>
    </div>
  )
}

export default Profile