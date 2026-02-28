import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Rules from "./pages/Rules.jsx";
import Records from "./pages/Records.jsx";
import Statbox from "./pages/Statbox.jsx";
import "./App.css";
import Header from "./components/Header.jsx";

export const ROUTES = [
  {
    path: "/",
    label: "Home",
    component: Home,
  },
  {
    path: "/rules",
    label: "Rules",
    component: Rules,
  },
  {
    path: "/records",
    label: "Records",
    component: Records,
  },
  // {
  //     path: "/statbox",
  //     label: "Statbox",
  //     component: Statbox,
  // },
];

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        {ROUTES.map((route) => {
          return (
            <Route
              path={route.path}
              key={"route-" + route.path}
              element={<route.component />}
            />
          );
        })}
      </Routes>
    </>
  );
}
