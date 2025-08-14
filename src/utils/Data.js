import { getRequest, postRequest } from "./Requests";
import { capitalizeWords } from "./Transformers";

export async function getHallData() {
  const API_PATH = "/api/league/hall";
  try {
    let data = await getRequest(API_PATH);
    data = data.map((entry) => ({
      year: entry.year,
      teamName: entry.teamName,
      managerName: capitalizeWords(entry.managerName),
    }));
    return data;
  } catch (error) {
    console.error("Error fetching hall data:", error);
    throw error;
  }
}

export async function getManagerData() {
  const API_PATH = "/api/league/managers";
  try {
    let data = await getRequest(API_PATH);
    data = data.map((entry) => ({
      managerName: capitalizeWords(entry.managerName),
    }));
    return data;
  } catch (error) {
    console.error("Error fetching hall data:", error);
    throw error;
  }
}

export async function searchMatchupData(data) {
  const API_PATH = "/api/league/matchups/search";
  try {
    let matchupData = await postRequest(API_PATH, data);
    return matchupData;
  } catch (error) {
    console.error("Error searching matchup data:", error);
    throw error;
  }
}
