import jwt from "jsonwebtoken"

import User from "../models/user.model.js"

export const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt
        console.log("token",token);
        
        if(!token){
            return res.status(401).json({
                message:"Unathorized -no token provied"
            })
        }

        const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!decode){
            return res.status(401).json({message:"unauthorized-invalid token"})

        }

        const user=await User.findById(decode.userId).select("-password")

           if(!user){
            return res.status(401).json({message:"unauthorized-User not found"})

        }

        req.user=user

        next()

    } catch (error) {
        console.log("error in protecting middleware",error);
        res.status(500).json({message:"Internal server Error"})
        
    }
} 