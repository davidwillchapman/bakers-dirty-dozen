import React from "react";
import { searchMatchupData, getManagerData } from "../utils/Data";

const DEFAULT_FILTER_OPTIONS = {
  year: Array.from({ length: 11 }, (_, i) => i + 2013), // Weeks 2013 to 2023
  managers: [],
  matchupTypes: [
    {
      label: "Regular Season",
      value: "NONE",
    },
    {
      label: "Playoffs",
      value: "WINNERS_BRACKET",
    },
    {
      label: "Playoff Consolation Bracket",
      value: "WINNERS_CONSOLATION_LADDER",
    },
    {
      label: "Losers Bracket",
      value: "LOSERS_CONSOLATION_LADDER",
    },
  ],
};

const DEFAULT_FILTER = {
  year: null,
  primaryManager: null,
  opposingManager: null,
  matchupType: null,
  points: null,
};

export default function Statbox() {
  const [filter, setFilter] = React.useState(DEFAULT_FILTER);
  const [filterOptions, setFilterOptions] = React.useState(
    DEFAULT_FILTER_OPTIONS
  );
  const [matchupData, setMatchupData] = React.useState([]);

  React.useEffect(() => {
    loadManagers();
    loadMatchupTypes();
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
  };

  return (
    <>
      <main>
        <section>
          <h2>Stat Sandbox</h2>
          <SearchFilter
            filter={filter}
            setFilter={setFilter}
            filterOptions={filterOptions}
          />
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
                    - Matchup Type
                    - Primary Team
                    - Primary Team Points
                    - Opposing Team
                    - Opposing Team Points
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
                    - Primary Team      (Dropdown)
                    - Opposing Team     (Dropdown)
                    - Matchup Type      (Dropdown) <Regular | Playoff | Championship>
                    - Points            (Range)

                    Follow up with additional fields:
                    - Week              (Range)
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
