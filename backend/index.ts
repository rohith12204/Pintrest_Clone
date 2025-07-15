import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import profileRoutes from './routes/profile'  // ✅ Step 1: Import route here


dotenv.config()

console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/profile', profileRoutes)   // ✅ Step 2: Add this after app.use

console.log("🔄 Connecting to MongoDB...");
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('✅ MongoDB Connected')

    app.get('/', (req: Request, res: Response) => {
      res.send('Backend is working!')
    })

    const PORT = process.env.PORT || 5000
    
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err)
  })
