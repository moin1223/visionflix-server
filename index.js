const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
dotenv.config();
// database connection with mongoose
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true,

})
.then(()=>console.log("DB connection succes"))
.catch(err=>console.log(err));

app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use((err,req,res,next)=>{
    if(err.message){
        res.status(500).send(err.message)
    }
    else{
        res.status(500).send("there was aon erroe!")
    }
})



app.listen(5000,()=>{
    console.log('backend server is ruring')
})

