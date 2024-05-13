import "dotenv/config";
import "./database/connectdb.js";
import cookieParser from "cookie-parser";
import express from "express";
//import cors from "cors";

import authRoute from "./routes/auth.route.js";
import linkRoute from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

//const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

/* app.use(
  cors({
    origin: function (origin, callback) {
      console.log("😎😎😎 =>", origin);
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback(
        new Error("Error de CORS origin:" + origin + " no autorizado!")
      );
    },
  })
); */

app.use(express.json());
app.use(cookieParser());

// Ejemplo back redirect (opcional)
//app.use("/", redirectRouter);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/links", linkRoute);

// Solo para ejemplo de Login/token
app.use(express.static('public'));

app.listen(PORT, () => console.log("🚀 http://localhost:" + PORT));
