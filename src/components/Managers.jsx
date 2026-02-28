import React from "react";
import { getManagerData } from "../utils/Data";

export default function Managers() {
  const [managersData, setManagersData] = React.useState([]);

  React.useEffect(() => {
    loadManagersData();
  }, []);

  const loadManagersData = async () => {
    let data = await getManagerData();
    setManagerData(data);
  };

  return (
    <>
      <h2>Manager Stats</h2>
      <p>Loading...</p>
    </>
  );
}
