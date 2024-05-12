import "dotenv/config";
import "./database/connectdb.js";
import express from 'express';
import authRoute from './routes/auth.route.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1", authRoute);

app.listen(PORT, () => console.log('🚀 http://localhost:' + PORT));