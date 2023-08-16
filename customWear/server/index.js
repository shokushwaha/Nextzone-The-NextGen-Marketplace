import  express  from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import dalleRoute from './routes/dalleRoute.js'

dotenv.config();
const PORT =process.env.PORT;
const app =express();
app.use(cors());
app.use(express.json({limit:"50mb"}));

app.use('/api/v1/dalle',dalleRoute);


app.get('/',(req,res)=>{
    res.status(200).json({message:"Hello"})
})

app.listen(PORT,()=>console.log(`Server has started on ${PORT}` ))