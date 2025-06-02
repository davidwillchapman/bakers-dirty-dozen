import React from "react";

export default function Hall() {
    const [apiRes, setApiRes] = React.useState("");

    const API_PATH = "/api/league";

    React.useEffect(() => {
        fetch(`${API_PATH}/seasons`).then((response) =>
            console.log(response.json())
        );
    }, []);
    return (
        <>
            <main>
                <section>
                    <h2>Hall of Fame</h2>
                </section>
            </main>
        </>
    );
}
