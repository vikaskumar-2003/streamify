import { useState } from "react";

import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import CallPages from "./pages/CallPages";
import ChatPage from "./pages/ChatPage";
import OnBoardingPage from "./pages/OnBoardingPage";
import HomePage from "./pages/HomePage";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "./lib/axios.instance";
import PageLoader from "./component/PageLoader";
import { getAuthUser } from "./lib/api";
import useAuthUser from "./hooks/useAuthUser";
import Layout from "./component/Layout";
import { useThemeStore } from "./store/useThemeStore";
import FriendsPage from "./pages/FriendPage";

function App() {


  //  const {data:authData,isLoading,error}=useQuery({
  //   queryKey:["authUser"],
  //   queryFn:getAuthUser,
    
  //   retry:false
  //  })

   const {isLoading,authUser}=useAuthUser()

   const{theme} =useThemeStore()

   const isAuthenticated=Boolean(authUser)

   const isOnboarded=authUser?.isOnboarded

       
   

         if(isLoading){
          return <PageLoader/>
         }


  return (


 

    <div className="h-screen "  data-theme={theme}>

      <Routes>
        <Route path="/" element={isAuthenticated&&isOnboarded?(<Layout showSidebar={true}><HomePage /></Layout>):(<Navigate to={!isAuthenticated?"/login":"/onboarding"}/>)} />
        <Route path="/signup" element={ !isAuthenticated?<SignUpPage/>:<Navigate to={isOnboarded?"/":"/onboarding"}/>} />
        <Route path="/login" element={!isAuthenticated?<LoginPage/>:<Navigate to={isOnboarded?"/":"/onboarding"}/>} />
        <Route path="/notifications" element={isAuthenticated&&isOnboarded?( <Layout showSidebar={true} > <NotificationPage /></Layout> ):<Navigate to={!isAuthenticated?"/login":"/onboarding"}/>} />
        <Route path="/call" element={ isAuthenticated? <CallPages />:<Navigate to="/login"/>} />
        <Route path="/chat" element={isAuthenticated ?<ChatPage />:<Navigate to="/login"/>} />
          <Route path="/friend" element={isAuthenticated ?<FriendsPage />:<Navigate to="/login"/>} />
        <Route path="/onBoarding" element={isAuthenticated?(!isOnboarded?(<OnBoardingPage/>):<Navigate to={"/"} />):<Navigate to="/login"/>} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App