import { Router, Request, Response } from "express";
import { getSeason } from "./league.service";

const leagueRouter = Router();

leagueRouter.get("/season/:year", (req: Request, res: Response) => {
    const seasonYear = parseInt(req.params.year);
    res.json(getSeason(seasonYear));
});

export default leagueRouter;
