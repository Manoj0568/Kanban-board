import express from 'express'
import dotenv from 'dotenv'
import connectToMongoDB from './DB/connectToMongoDb.js'
import cardRouter from './routers/card.router.js'
import path from 'path';
const __dirname = path.resolve();
const app = express()
dotenv.config()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.use("/api",cardRouter)
app.use(express.static(path.join(__dirname, '/Frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
app.listen(PORT,()=>{
        connectToMongoDB()
        console.log(`server running in http://localhost:${PORT}`)
})