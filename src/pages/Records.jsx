import React from "react";
import { getHallData } from "../utils/Data";
import Hall from "../components/Hall";

export default function Records() {
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
          <Hall />
        </section>
      </main>
    </>
  );
}
