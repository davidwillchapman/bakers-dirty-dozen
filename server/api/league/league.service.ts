import * as dbClient from "../db/league.dbClient";

export async function getSeason(season: number): Promise<string> {
    const seasonData = await dbClient.getAllByField("seasons", "year", season);
    return JSON.stringify(seasonData);
}

export async function getAllSeasons(): Promise<string> {
    const seasons = await dbClient.getAll("seasons");
    return JSON.stringify(seasons);
}

export async function getHallOfFame(): Promise<string> {
    const hallOfFame = await dbClient.getAllByField("teams", "finalStanding", 1);
    return JSON.stringify(hallOfFame);
}

export async function searchMatchups(params: Record<string, string | number>): Promise<string> {
    const matchups = await dbClient.find("matchups", params);
    return JSON.stringify(matchups);
}