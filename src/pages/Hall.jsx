import React from "react";
import { getHallData } from "../utils/Data";
import { Card } from "../components/Card";

export default function Hall() {
    const [hallData, setHallData] = React.useState([]);

    React.useEffect(() => {
        loadHallData();
    }, []);

    const loadHallData = async () => {
        let data = await getHallData();
        setHallData(data);
    };

    return (
        <>
            <main>
                <section>
                    <h2>Hall of Fame</h2>
                    {hallData ? (
                        <Championships data={hallData}></Championships>
                    ) : (
                        <p>Loading...</p>
                    )}
                </section>
            </main>
        </>
    );
}

function Championships(props) {
    const [records, setRecords] = React.useState([]);

    React.useEffect(() => {
        parseRecords();
    }, []);

    const parseRecords = async () => {
        let temp = {};
        console.log(props.data);
        props.data.forEach((element) => {
            console.log(element);
            if (temp[element.managerName] != undefined) {
                //add to object
                temp[element.managerName] = [
                    ...temp.element.managerName,
                    { year: element.year, teamName: element.teamName },
                ];
            } else {
                //inc object
                temp[element.managerName] = [
                    { year: element.year, teamName: element.teamName },
                ];
            }
        });
        console.log(temp);
        setRecords(temp);
    };

    return (
        <>
            <ul>
                {props.data.map((entry, index) => (
                    <li key={index}>
                        <strong>{entry.year}</strong> - {entry.teamName} -{" "}
                        {entry.managerName}
                    </li>
                ))}
            </ul>
            {Object.keys(records)}
        </>
    );
}
