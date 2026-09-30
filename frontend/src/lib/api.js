import { axiosInstance } from "./axios.instance"

export const signup=async function (signupData) {
    const response=await axiosInstance.post("/auth/register",signupData)
    return response.data
  }

  export const login=async function (loginData) {
    const response=await axiosInstance.post("/auth/login",loginData)
    return response.data
  }

   export const logout=async function () {
    const response=await axiosInstance.post("/auth/logout")
    return response.data
  }




  export const getAuthUser=async()=>{
     try {
       const res=await axiosInstance.get("auth/me")
 
       return res.data
     } catch (error) {
      console.log("error in auth user");
      
      return null
     }
    }

    export const completeOnboarding=async (userData)=>{


      const response=await axiosInstance.post("/auth/onboarding",userData)

        return response.data


    }


    export const getUserFriends=async function () {
    const response=await axiosInstance.get("/users/friends")
    return response.data
  }

  export const getRecommendedUsers=async function () {
    const response=await axiosInstance.get("/users")
    return response.data
  }

 

  export const  getoutGoingFreindsReqs=async function () {
    const response=await axiosInstance.get("/users/outgoing-friend-requests")
    return response.data
  }

  

  export const  sendFriendRequest=async function (userId) {
    console.log("user id from api",userId);
    
    const response=await axiosInstance.post(`/users/friend-request/${userId}`)    
    console.log("response",response);
    
    return response.data
  }

  export const  getFriendRequests=async function () {

    
    const response=await axiosInstance.get(`/users/friend-request`)    
    console.log("response",response);
    
    return response.data
  }


  

    export const  acceptFriendRequest=async function (requestId) {

    
    const response=await axiosInstance.put(`/users/friend-request/${requestId}/accept`)    
    console.log("response",response);
    
    return response.data
  }





