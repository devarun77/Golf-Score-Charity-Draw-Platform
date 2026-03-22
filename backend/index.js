import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Importing from config
import connectDB from "./config/db.js";

//Importing routes
import authRoutes from "./routes/authRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import charityRoutes from "./routes/charityRoutes.js";

dotenv.config();
const app = express();
const Port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

//Requesting routes
app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/draws", drawRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/charities", charityRoutes);

// Default Error handlerr
app.use((err, req, res, next) => {

    if(err.name === "ValidationError") {
        return res.status(400).json({message: err.message});
    }
    
    const {status = 500, message="Something went wrong"} = err;
    res.status(status).json({message: message});
});

//Start Server
const start = async () => {

    try {
        connectDB();

        app.listen(Port, () => {
            console.log(`Server is listening at : ${Port}`);
        });
    }
    catch (error) {
        console.error("Failed to Start Application", error.message);
        console.error(error);
        process.exit(1);
    };
};
start();