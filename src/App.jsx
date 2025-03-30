import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Rules from "./pages/Rules.jsx";
import Hall from "./pages/Hall.jsx";
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
        label: "League Rules",
        component: Rules,
    },
    {
        path: "/hall",
        label: "Hall of Fame",
        component: Hall,
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
