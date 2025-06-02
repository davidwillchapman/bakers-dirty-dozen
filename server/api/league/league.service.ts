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
    //const hallOfFame = await dbClient.getAll("teams");
    const hallOfFame = await dbClient.getAllByField("teams", "finalStanding", 1);

    return JSON.stringify(hallOfFame);
}

export async function getSeasonWeek(teamId: number): Promise<string> {
    const teamData = await dbClient.getAllByField("teams", "id", teamId);
    return JSON.stringify(teamData);
}