import { Router } from "express"
import { getUser } from "./handlers/users"
import { buyStocks, sellStocks } from "./handlers/transactions"


const router = Router()




router.get('/user/:id',getUser)

// transactions
router.post('/buystocks', buyStocks)
router.post('/sellstocks', sellStocks)




export default router