import React from "react";
import { searchMatchupData, getManagerData } from "../utils/Data";

const DEFAULT_FILTER_OPTIONS = {
    year: Array.from({ length: 11 }, (_, i) => i + 2013), // Weeks 1 to 18
    managers: [],
};

const DEFAULT_FILTER = {
    year: null,
    manager: null,
}

export default function Statbox() {
    const [filter, setFilter] = React.useState(DEFAULT_FILTER);
    const [filterOptions, setFilterOptions] = React.useState(DEFAULT_FILTER_OPTIONS);
    const [matchupData, setMatchupData] = React.useState([]);

    React.useEffect(() => {
        loadManagers();
    }, []);

    const handleSearch = async () => {
        let matchupData = await searchMatchupData({
            year: filter.year,
        });
        setMatchupData(matchupData);
    };

    const loadManagers = async () => {
        let managers = await getManagerData();
        setFilterOptions((prev) => ({
            ...prev,
            managers: managers.map((manager) => manager.managerName),
        }));
    }

    return (
        <>
            <main>
                <section>
                    <h2>Stat Sandbox</h2>
                    <SearchFilter filter={filter} setFilter={setFilter} filterOptions={filterOptions} />
                    <button onClick={handleSearch}>Search</button>
                    {matchupData.map((matchup, index) => (
                        <div key={index}>
                            <p>
                                Year: {matchup.year}, Points: {matchup.points}
                            </p>
                        </div>
                    ))}
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

function SearchFilter(props) {
    const { filter, setFilter, filterOptions } = props;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <h3>Filter</h3>
            {/* Implement filter inputs here */}
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
            <form>
                <label>
                    Year:
                    <select name="year" onChange={handleChange}>
                        {filterOptions.year.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Managers:
                    <select name="manager" onChange={handleChange}>
                        {filterOptions.managers?.map((manager, index) => (
                            <option key={index} value={manager}>
                                {manager}
                            </option>
                        ))}
                    </select>
                </label>
            </form>
        </div>
    );
}