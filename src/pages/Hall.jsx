import React from "react";
import { getHallData } from "../utils/Data";

export default function Hall() {
    const [hallData, setHallData] = React.useState([]);

    const API_PATH = "/api/league";

    React.useEffect(() => {
        loadHallData();
    }, []);

    const loadHallData = async () => {
        let data = await getHallData();
        setHallData(data);
    }

    return (
        <>
            <main>
                <section>
                    <h2>Hall of Fame</h2>
                    {hallData ? (
                        <ul>
                            {hallData.map((entry, index) => (
                                <li key={index}>
                                    <strong>{entry.year}</strong> - {entry.teamName} - {entry.managerName}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )}
                </section>
            </main>
        </>
    );
}
