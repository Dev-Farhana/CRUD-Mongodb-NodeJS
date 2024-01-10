const mongoose = require("mongoose");
const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());

const userRouter = require("./router/userRoutes");
app.use(express.json());

mongoose.connect(process.env.MongoDB_URL)
.then(() =>{
    console.log("Mongodb Connected!")
    const PORT = process.env.PORT ;
    app.listen(PORT || 8000 , (err) => {
        if(err) {
            console.log("Error occured ==>" ,err)
        } else{
            console.log(`Port running ${PORT}`);
        }
    })
})
.catch((err) => console.log("error occur" ,  err))

app.use(userRouter);
