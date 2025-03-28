import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home.jsx";
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter(
    [
        {
            path: "/",
            Component: Home,
        },
    ],
    { basename: "/bakers-dirty-dozen" }
);

export default function App() {
    return (
        <>
            <CssBaseline />
            <RouterProvider router={router} />
        </>
    );
}
