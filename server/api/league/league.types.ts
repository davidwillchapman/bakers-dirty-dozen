export type season = {
    id: number;
    year: number;
    weeks: number;
    playoffStart: number;
    platform: string;
};

export type team = {
    id: number;
    platformUserId: string;
    managerName: string;
    teamName: string;
    year: number;
    rosterId: number;
    aquisitions: number;
    trades: number;
    playoffSeed: number;
    finalStanding: number;
};

export type matchup = {
    id: number;
    year: number;
    week: number;
    matchupId: number;
    teamId: number;
    points: number;
    matchupType: string;
};
