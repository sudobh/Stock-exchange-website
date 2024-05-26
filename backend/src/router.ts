import { Router } from "express"
import { getUser } from "./handlers/users"

const router = Router()




router.get('/user/:id',getUser)




export default router