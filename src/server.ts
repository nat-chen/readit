import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth';
import trim from './middleware/trim';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(trim);
app.use(cookieParser());

app.get("/", (_, res) => res.send("Hello world"));
app.use('/api/auth', authRoutes);

app.listen(5000, async () => {
  console.log("Server running at http://localhost:5000");
  try {
		await createConnection();
  } catch (err) {
		console.log(err)
	}
});