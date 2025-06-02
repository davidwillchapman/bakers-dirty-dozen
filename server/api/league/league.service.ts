import * as dbClient from "../db/league.dbClient";

export async function getSeason(season: number): Promise<string> {
    const seasonData = await dbClient.getByField("seasons", "year", season);
    return JSON.stringify(seasonData);
}

export async function getAllSeasons(): Promise<string> {
    const seasons = await dbClient.getAll("seasons");
    return JSON.stringify(seasons);
}

export async function getHallOfFame(): Promise<string> {
    const hallOfFame = await dbClient.findBy();
    return JSON.stringify(hallOfFame);
}
