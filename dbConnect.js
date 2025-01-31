import dotenv from "dotenv";
import pg from "pg";

// init the .env file
// This has to be done first...
dotenv.config();

// So that this works
// create a db pool to connect server to database
const db = new pg.Pool(
    {
        connectionString: process.env.DATABASE_URL,
    }
)