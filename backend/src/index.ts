<<<<<<< HEAD
import app from './server'
=======
import * as dotenv from "dotenv"
dotenv.config()
import app from './server'


>>>>>>> 8f2f0aff7bb3f0cbd0cdfb996feb5b6667023d91
app.listen(3001, () => {
    console.log("hello on http://localhost:3001")
})