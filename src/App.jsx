import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Rules from "./pages/Rules.jsx";
import Hall from "./pages/Hall.jsx";
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
        path: "/hall",
        label: "Records",
        component: Hall,
    },
    {
        path: "/statbox",
        label: "Statbox",
        component: Statbox,
    },
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
