import React from "react";
import NavBar from "./NavBar";
import dirtyDude from "../assets/dirty_dude.png";

export default function Header() {
    return (
        <header>
            <div className="header-group">
                <img
                    className="header-image"
                    src={dirtyDude}
                    height={100}
                    width={100}
                />
                <h1>Baker's Dirty Dozen</h1>
            </div>
            <NavBar />
        </header>
    );
}
