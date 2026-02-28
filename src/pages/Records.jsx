import React from "react";
import Hall from "../components/Hall";
import ManagerInfo from "../components/ManagerInfo";
import Seasons from "../components/Seasons";

const TAB_SETTINGS = [
  {
    name: "Hall",
    component: Hall,
  },
  {
    name: "Manager Info",
    component: ManagerInfo,
  },
  {
    name: "Seasons",
    component: Seasons,
  },
];

export default function Records() {
  const [activeTab, setActiveTab] = React.useState(null);

  const handleTabChange = (e) => {
    const newTab = e.target.value;
    const newComponent = TAB_SETTINGS.find((el) => el.name === newTab);
    setActiveTab(newComponent);
  };

  return (
    <>
      <main>
        <section>
          <h1>Records</h1>
          <div className="records-tab">
            {TAB_SETTINGS.map((element) => {
              return (
                <button
                  className="records-tab-button"
                  key={`${element.name}-key`}
                  value={element.name}
                  onClick={handleTabChange}
                >
                  {element.name}
                </button>
              );
            })}
          </div>
          {activeTab && <activeTab.component />}
        </section>
      </main>
    </>
  );
}
