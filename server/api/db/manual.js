import sqlite3 from "sqlite3";
import { open } from "sqlite";

const DB_PATH = "./league.db";

async function connect() {
    return await open({
        filename: DB_PATH,
        driver: sqlite3.Database,
    });
}

async function close(db) {
    await db.close();
}

async function insertTeams(db, teamData) {
    for (let team of teamData) {
        db.run(
            INSERT_TEAMS,
            [
                null,
                team.platformUserId,
                team.managerName,
                team.teamName,
                team.year,
                team.rosterId,
                team.acquisitions,
                team.trades,
                team.playoffSeed,
                team.finalStanding,
            ],
            function (err) {
                if (err) {
                    console.error(err.message);
                }
            }
        );
    }
}

async function insertStatementBuilder(table, inputLength) {
    let values = Array.from({ length: inputLength }, (_, i) => "?").join();
    let statement = `INSERT INTO ${table} VALUES (${values}) RETURNING *`;
    return statement;
}

const INSERT_TEAMS = await insertStatementBuilder("teams", 10);

const team1 = {
    platformUserId: "D7563649-D08F-4442-B01B-258AEA9FC634",
    managerName: "blake compton",
    teamName: "Team Compton",
    year: 2011,
    rosterId: 13,
    acquisitions: 0,
    trades: 0,
    playoffSeed: 13,
    finalStanding: 1,
};
const team2 = {
    platformUserId: "BC5D30FD-86A2-4B18-9D30-FD86A23B1867",
    managerName: "levi wigg",
    teamName: "Team Wigg",
    year: 2012,
    rosterId: 13,
    acquisitions: 0,
    trades: 0,
    playoffSeed: 13,
    finalStanding: 1,
};

const team3 = {
    platformUserId: "D7563649-D08F-4442-B01B-258AEA9FC634",
    managerName: "michael hoffer",
    teamName: "Grasshoffer",
    year: 2023,
    rosterId: 13,
    acquisitions: 0,
    trades: 0,
    playoffSeed: 13,
    finalStanding: 1,
};

const team4 = {
    platformUserId: "D7563649-D08F-4442-B01B-258AEA9FC634",
    managerName: "mchenry pattison",
    teamName: "Tha Swampdonkeys",
    year: 2024,
    rosterId: 13,
    acquisitions: 0,
    trades: 0,
    playoffSeed: 13,
    finalStanding: 1,
};

const db = await connect();

await insertTeams(db, [team1, team2, team3, team4]);

await close(db);
