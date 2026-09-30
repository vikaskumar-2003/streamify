import FriendRequest from "../models/freindRequest.model.js"
import User from "../models/user.model.js"

export async function getRecommendedUsers(req,res){

try {
    const currentUserId=req.user.id 
    const currentUser=req.user
    const recommendedUser=await User.find({
        $and:[{
            _id:{$ne:currentUserId}//exclude current user
        },
         {
            _id:{$nin:currentUser.friend}
         },
         {
            isOnboarded:true
         }
        ]

        
    })

    res.status(200).json(recommendedUser)
} catch (error) {
    console.log("error in getRecommendedUser controller",error.message);
    res.status(500).json({
        message:"internal server error"
    })
}


}



export async function getMyFriends(req,res){
    

    try {
        
        const user=await User.findById(req.user.id).select("friends").populate("friends","fullName profilePic nativeLanguage learningLanguage")

        res.status(200).json(user.friends)

    } catch (error) {
        console.log("eror form get my friend",error.message);
        
           res.status(500).json({
            message:"Internal server error"
           })
    }



}


export async function sendFriendRequest(req,res){
   
        try {
            const myId=req.user.id

             console.log("myid",myId);
             

            const {id:recipentId}=req.params

            console.log("recipentId",recipentId);
            

            //prevent sending req to yourself
            if(myId===recipentId){
                return res.status(400).json({
                    message:"you can not send friend request to yourself"
                })
            }
//check if user ia alreay freind

            const recipient = await User.findById(recipentId);
            console.log("recipient resut",recipient);
            
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }


            if(recipient.friends.includes(myId)){
                return res.status(400).json({
                    message:"you are already friend with this user"
                })
            }
            //chekc if a req already exisgs
            const existingRequest=await FriendRequest.findOne({
                $or:[{
                    sender:myId,recipient:recipentId
                },{
                    sender:recipentId,recipient:myId
                }]
            })
            console.log("exist user freind",existingRequest);
            

            if(existingRequest){
                return res.status(400).json({
                    message:"Afreind requestalready exists between you and this user"
                })
            }

            const friendRequst=await FriendRequest.create({
                sender:myId,
                recipient:recipentId
            })

            console.log("friendRequest",friendRequst);
            

            res.status(201).json(friendRequst)


        } catch (error) {
            console.log("error in sendFreindRequest controller",error)
            res.status(500).json({
                message:"Internal server error"
            })
            
        }

}


export async function acceptFriendRequest(req,res){
try {
    const {id:requestId}=req.params

    const freindRequest=await FriendRequest.findById(requestId)

    if(!freindRequest){
        return res.status(400).json({
            message:"Freind request not found"
        })
    }

    //verfiy the current user is the recipent

    
    if(freindRequest.recipient.toString()!==req.user.id){
        return res.status(400).json({
            message:"ypu are not authorized to accept this request"
        })
    }

    freindRequest.status="accepted"

    await freindRequest.save()

    //add each  user to the other freind array

    await User.findByIdAndUpdate(freindRequest.recipient,{
        $addToSet:{
            friends:friendRequst.sender
        }
    })


      await User.findByIdAndUpdate(freindRequest.sender,{
        $addToSet:{
            friends:friendRequst.recipient
        }
    })

    res.status(200).json({message:"friend request accepted"})


} catch (error) {
    console.log("error in accept Friend request");
    res.status(500).json({
        message:"internal  server error"
    })
}
}

export async function getFriendRequest(req,res) {


    try {
        const incomingReqs=await FriendRequest.find({
            recipient:req.user.id,
            status:"pending",

        }).populate("sender","fullName profilePic nativeLanguage learningLanguage")

       const acceptedReqs=await FriendRequest.find({
        sender:req.user.id,
        status:"accepted"
       }).populate("recipient","fullName profilePic")

         res.status(200).json({incomingReqs,acceptedReqs})


    } catch (error) {
        console.log("error in getPendingFreindRequests controller",error.message);
        res.status(500).json({message:"Internal server error"})
    }
    
}

export const getOutgoingFriendReqs=async(req,res)=>{
    try {
        const outGoingRequests=await FriendRequest.find({
            sender:req.user.id,
            status:"pending",

        }).populate("recipient","fullName profilePic nativeLangugae learingLanguage")

           res.status(200).json(outGoingRequests)

    } catch (error) {
        
          console.log("error in getOutgoingFreindRequests controller",error.message);
        res.status(500).json({message:"Internal server error"})
    


    }
}