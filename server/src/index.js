import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const password = process.env.PASSWORD;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://kennethsoriano:${password}@recipes.ndnyrwj.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes`)

app.listen(3001, () => console.log("Server running on port 3001"));