import {Router} from "express"
import { login, logout, onboard, register } from "../controllers/auth.controllers.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const routes=Router()

routes.post("/register",register)
routes.post("/login",login)
routes.post("/logout",logout)

routes.post("/onboarding",protectRoute,onboard)

routes.get("/me",protectRoute,(req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user
    })
})

export default routes