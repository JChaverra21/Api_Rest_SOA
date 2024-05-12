import "dotenv/config";
import "./database/connectdb.js";
import express from 'express';
import authRoute from './routes/auth.route.js';
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);

// Solo para ejemplo de Login/token
app.use(express.static('public'));

app.listen(PORT, () => console.log('🚀 http://localhost:' + PORT));