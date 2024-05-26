import { Router } from "express"
import { getUser } from "./handlers/users"

const router = Router()


/**
 * COMPANY
 */
router.get('/company', () => {})
router.get('/company/:id', () => { })
router.put('/company/:id', () => { })
router.post('/company', () => { })

router.get('/user/:id',getUser)




export default router