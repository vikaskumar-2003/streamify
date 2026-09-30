import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getStreamToken } from "../controllers/chat.controller.js"


const routes=express.Router()

routes.get("/toekn",protectRoute,getStreamToken)


export default routes