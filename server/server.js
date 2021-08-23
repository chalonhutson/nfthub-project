// Importing Node modules
const express = require("express");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const path = require("path");

// Importing server files
const ctrl = require("./controller.js");


const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static("client"));





app.get("/", ctrl.landingPage);
app.get("/artists", ctrl.artists);
app.get("/getAllNFTs", ctrl.getAllNFTs)




const port = process.env.PORT || 4200
app.listen(port, ()=> {console.log(`Up and running on Port ${port}, Captain!`)});