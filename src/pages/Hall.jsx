import React from "react";

export default function Hall() {
    const [apiRes, setApiRes] = React.useState("");

    const API_POC = "/api/";

    React.useEffect(() => {
        fetch(API_POC).then((response) => setApiRes(response.text()));
    }, []);
    return (
        <>
            <main>
                <section>
                    <h2>Hall of Fame</h2>
                    <p>{apiRes}</p>
                </section>
            </main>
        </>
    );
}
