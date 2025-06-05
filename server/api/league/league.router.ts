import { Router, Request, Response } from "express";
import * as leagueService from "./league.service";

const leagueRouter = Router();

leagueRouter.get("/season/:year", async (req: Request, res: Response) => {
    const seasonYear = parseInt(req.params.year);
    res.json(JSON.parse(await leagueService.getSeason(seasonYear)));
});

leagueRouter.get("/seasons", async (req: Request, res: Response) => {
    res.json(JSON.parse(await leagueService.getAllSeasons()));
});

leagueRouter.get("/hall", async (req: Request, res: Response) => {
    res.json(JSON.parse(await leagueService.getHallOfFame()));
});

leagueRouter.post("/matchups/search", async (req: Request, res: Response) => {
    res.json(JSON.parse(await leagueService.searchMatchups(req.body)));
});

export default leagueRouter;
