import { getRequest, postRequest } from "./Requests";
import { capitalizeWords } from "./Transformers";

export async function getHallData() {
    const API_PATH = "/api/league/hall";
    try {
        let hallData = await getRequest(API_PATH);
        hallData = hallData.map((entry) => ({
            year: entry.year,
            teamName: entry.teamName,
            managerName: capitalizeWords(entry.managerName),
        }));
        return hallData;
    } catch (error) {
        console.error("Error fetching hall data:", error);
        throw error;
    }
}

export async function getManagerData() {
    const API_PATH = "/api/league/managers";
    try {
        let hallData = await getRequest(API_PATH);
        hallData = hallData.map((entry) => ({
            managerName: capitalizeWords(entry.managerName),
        }));
        return hallData;
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
