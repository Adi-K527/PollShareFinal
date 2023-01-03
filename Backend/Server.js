const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
const dotenv = require('dotenv').config()


mongoose.connect(process.env.MONGO_URI)
const port = process.env.PORT || 8000


//MIDDLEWARE 
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))

//ROUTES
app.use("/api/post", require("./Routes/postRoutes"))
app.use("/api/user", require("./Routes/userRoutes"))

//SERVER
app.listen(port, () => console.log("Running on port " + port))




  ///////////////////////////////////       TO-DO LIST      ////////////////////////////////////////
//- Styling, incorporate TailwindCSS (2 days)
//- deploy on a thing (1 day)


//                            Projected finish date: January 4th, 2023