import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();

//Tells the server we will be using json
app.use(express.json());

//Sets local host 
const PORT = 8080;
app.listen(PORT, (req, res) => {});