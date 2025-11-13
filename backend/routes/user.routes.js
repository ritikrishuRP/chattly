import express from "express"
import {upload} from "../middlewares/multer.js"
import isAuth from "../middlewares/isAuth.js"
import { getCurrentUser, editProfile } from "../controllers/user.controllers.js"


const userRouter=express.Router()

userRouter.get("/current",isAuth, getCurrentUser)
// userRouter.get("/others",isAuth, getOtherUsers)
userRouter.put("/profile",isAuth,upload.single("image"),editProfile)
// userRouter.get("/search",isAuth, search)


export default userRouter