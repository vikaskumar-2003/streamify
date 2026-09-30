import {StreamChat} from "stream-chat"
import "dotenv/config"

const apiKey=process.env.STREAM_API_KEY

const apiSecret=process.env.STREAM_API_SECRET

if(!apiKey||!apiSecret){
    console.error("Stream Api key airSecret is missing");
    
}

const streamClient=StreamChat.getInstance(apiKey,apiSecret)

export const upsertStreamUser=async (userData)=>{
    try {
        await streamClient.upsertUsers([userData])

        return userData

    } catch (error) {
        console.error("error creating stream");
        
    }
}

//
export const generateStreamToken=(userId)=>{
try {
    //ensure userId is string
   
    const userIdStr=userId.toString()
   return streamClient.createToken(userIdStr)

} catch (error) {
    console.error("error generating stream toekn",error)
}
}