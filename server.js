import express from "express";
import cors from "cors";


const app = express();

//Tells the server we will be using json
app.use(express.json());

//Sets local host 
//Anonymous callback arrow function ie. function with no name.
const PORT = 8080;
app.listen(PORT, (req, res) => {
    console.log(`Server is running PORT ${PORT}`);
});

//Root route of server - the main address (/) -- READ (GET)
//Each route has two elements, the address and the task
// The task here is to read data
app.get("/", function (_, res) {
    res.json({message: "This is the root route, how ruoude!"});
});

// Tell server to allow resource sharing with CORS
app.use(cors());