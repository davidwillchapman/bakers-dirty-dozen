import React from "react";

export default function Statbox() {
    const [filter, setFilter] = React.useState({});

    React.useEffect(() => {

    }, []);

    return (
        <>
            <main>
                <section>
                    <h2>Stat Sandbox</h2>
                    {/* 
                    Filter 
                    Input fields:
                    - Year              (Dropdown)
                    - Week              (Range)
                    - Primary Team      (Dropdown)
                    - Opposing Team     (Dropdown)
                    - Matchup Type      (Dropdown) <Regular | Playoff | Championship>
                    - Points            (Range)
                    - Result            (Dropdown) <Win | Loss | Draw>             
                    */}

                    {/* 
                    Results 
                    Table with columns:
                    - Year
                    - Week
                    - Primary Team
                    - Opposing Team
                    - Matchup Type
                    - Points
                    - Result
                    */}
                </section>
            </main>
        </>
    );
}