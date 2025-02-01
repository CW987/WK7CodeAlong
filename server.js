import express from "express";
import cors from "cors";
import { db } from "./dbConnect.js";

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

// CRUD create, read, update, delete. Post, Get, Put, Delete.

app.get("/guests", async (req, res) => {
    const result = await db.query(`SELECT * FROM guests`); //Can use multiple of these to select different pieces of data for a new endpoint
    res.json(result.rows);
});

// POST ROUTE - new data entry - requires client to work

app.post("/add-guest", (req, res) => {
    //Requires element to store new data
    const newData = req.body;
    db.query(`INSERT INTO guests (guest_name, date_of_stay, comments) VALUES($1, $2, $3)`, [newData.guest_name, newData.date_of_stay, newData.comments]
    )
});

// Example body object - for postman
// {
//     guest_name: "Jane Doe",
//     date_of_stay: "2024/05/26",
//     comments: "Died here"
// }

//  update an existing entry - one element to request the data, one to specify which entry to be updated --> params
app.put("/update-guest/:id", (req, res) => {
    const updateData = req.body;
    const paramsToUpdateGuest = req.params;
    const query = db.query(`UPDATE guests SET guest_name = $1, date_of_stay = $2, comments = $3 WHERE id= $4`, [
        updateData.guest_name, 
        updateData.date_of_stay, 
        updateData.comments,
        paramsToUpdateGuest.id
    ]);
    res.json({ message: "Data update complete! Go check it" })
});

// example param object
// params = {
//     id: 1,
// }

// Delete 
app.delete("/delete-entry/:id", (req, res) => {
    const paramsToDeleteGuest = req.params;
    const query = db.query(`DELETE FROM guests WHERE id= $1`, [paramsToDeleteGuest.id] );
    res.json({ message: "Shocktopus Record deleted" })
});