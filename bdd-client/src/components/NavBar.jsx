import React from "react";
import { Link } from "react-router";
import { ROUTES } from "../App";

export default function NavBar() {
    return (
        <nav>
            {ROUTES.map((element) => {
                return (
                    <Link to={element.path} key={"nav-" + element.path}>
                        {element.label}
                    </Link>
                );
            })}
        </nav>
    );
}
