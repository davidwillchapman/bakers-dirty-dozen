import { getRequest } from "./Requests";
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
    }
    catch (error) {
        console.error("Error fetching hall data:", error);
        throw error;
    }
}