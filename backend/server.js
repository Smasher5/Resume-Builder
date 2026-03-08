import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'
import userRoutes from './routes/userRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
import { connectDB } from './config/db.js'

// We don't strictly need fileURLToPath if we use process.cwd() for uploads
// but keeping it here in case you need it for other imports.
import { fileURLToPath } from 'url'
const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

const app = express()
const PORT = 3000

app.use(cors())

connectDB()

app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/resume', resumeRoutes)

// ✅ CRITICAL FIX: Use process.cwd() to match the controller's upload path
// This ensures you are serving from the ROOT 'uploads' folder, not 'src/uploads'
app.use('/uploads', 
    express.static(path.join(process.cwd(), 'uploads'), {
        setHeaders: (res, req) => {
            res.set('Access-Control-Allow-Origin', 'http://localhost:5173')
        }
    })
)

app.get('/', (req, res) => {
    res.send("Server is running") 
})

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
})