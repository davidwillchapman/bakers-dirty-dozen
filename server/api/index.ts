import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import leagueRouter from "./league/league.router";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001;

app.use("/api/league", leagueRouter);

app.get("/api", (req: Request, res: Response) => {
    res.send("Coming Soon!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
