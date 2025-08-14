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

export async function searchMatchups(
  params: Record<string, string | number>
): Promise<string> {
  // - Year              number
  // - Primary Team      string
  // - Opposing Team     string
  // - Matchup Type      string <Regular | Playoff | Championship>
  // - Points            (Range)

  // TODO: Transform Manager to team request
  const transformedParams: any = {};
  try {
    for (const [field, value] of Object.entries(params)) {
      switch (field) {
        case "primaryManager":
          const teamIds = await getTeamIds(value);
          console.log(teamIds);
          if (params.year) {
            transformedParams["teamId"] = teamIds.filter((team: any) => {
              return team.year === params.year;
            })[0].rosterId;
          } else {
            transformedParams["teamId"] = teamIds.map((team: any) => {
              return team.rosterId;
            });
          }
          break;
        case "opposingManager":
          break;
        case "matchupType":
          break;
        case "pointsFrom":
          transformedParams["points"] = {
            ...transformedParams["points"],
            $gte: value,
          };
          break;
        case "pointsTo":
          transformedParams["points"] = {
            ...transformedParams["points"],
            $lte: value,
          };
          break;
        default:
          transformedParams[field] = value;
          break;
      }
    }
  } catch (e) {
    console.error(e);
    let errorMessage = { error: "Error" };
    return JSON.stringify(errorMessage);
  }
  console.log(transformedParams);
  const matchups = await dbClient.find("matchups", transformedParams);
  // TODO: Transform response for Primary vs Opposing Team
  return JSON.stringify(matchups);
}

export async function getManagers(): Promise<string> {
  const managers = await dbClient.getDistinctValues("teams", ["managerName"]);
  return JSON.stringify(managers);
}

export async function getMatchupTypes(): Promise<string> {
  const matchupTypes = await dbClient.getDistinctValues("matchups", [
    "matchupType",
  ]);
  return JSON.stringify(matchupTypes);
}

async function getTeamIds(managerName: any): Promise<any> {
  const teamIds = await dbClient.getAllByField(
    "teams",
    "managerName",
    managerName
  );
  return teamIds;
}
