<<<<<<< HEAD
import express from 'express'
const app = express()

=======
import express from "express"
import router from "./router"
import morgan from "morgan"
import cors from "cors"
import { protect } from "./modules/auth"
import { createNewUser, signIn } from "./handlers/users"

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

>>>>>>> 8f2f0aff7bb3f0cbd0cdfb996feb5b6667023d91
app.get('/', (req, res) => {
    res.status(200)
    res.json({message: "hello"})
})

<<<<<<< HEAD
=======
app.use("/api",protect, router)
app.post("/signup", createNewUser)
app.post("/signin", signIn)

>>>>>>> 8f2f0aff7bb3f0cbd0cdfb996feb5b6667023d91
export default app