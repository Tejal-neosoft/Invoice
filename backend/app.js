import express from 'express'
import mongoose from 'mongoose'
import postRoutes from './routes/postRoutes.js'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/posts",postRoutes)

const db = "mongodb://localhost:27017/invoice"
const connectDB = async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true})
        console.log("Mongodb is connected");
    }
    catch(err){
        console.log(err.message);
    }
}
connectDB();

app.listen(8899,(err)=>{
    if(err) throw err
    else{
        console.log("Port is listeining in 8899");
    }
})