import React from "react";
import NavBar from "./NavBar";

export default function Header() {
    const HEADER_IMG_LINK = new URL( "/dirty_dude.png" , import.meta.url ).href;
 
    return (
        <header>
            <div className="header-group">
                <img
                    className="header-image"
                    src={HEADER_IMG_LINK}
                    height={100}
                    width={100}
                />
                <h1>Baker's Dirty Dozen</h1>
            </div>
            <NavBar />
        </header>
    );
}
