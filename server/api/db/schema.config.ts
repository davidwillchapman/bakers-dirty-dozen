export const CREATE_SEASONS_TABLE: string = `
    CREATE TABLE seasons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    weeks INTEGER NOT NULL,
    playoffStart INTEGER NOT NULL,
    platform TEXT NOT NULL
)`;

export const CREATE_TEAMS_TABLE: string = `
    CREATE TABLE teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platformUserId TEXT NOT NULL, 
    managerName TEXT NOT NULL,    
    teamName TEXT NOT NULL,
    year INTEGER NOT NULL,
    rosterId INTEGER NOT NULL,
    aquisitions INTEGER NOT NULL,
    trades INTEGER NOT NULL,
    playoffSeed INTEGER NOT NULL,
    finalStanding INTEGER NOT NULL
)`;

export const CREATE_MATCHUPS_TABLE: string = `
    CREATE TABLE matchups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    week INTEGER NOT NULL,
    matchupId INTEGER NOT NULL,
    teamId INTEGER NOT NULL,
    points REAL NOT NULL,
    matchupType STRING NOT NULL
)`;
