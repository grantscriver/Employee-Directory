import React from "react";
import Search from "./Search.js";

function Nav({ newSearch }) {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="navbar-collapse row" id="navbarNav">
                <Search newSearch={newSearch} />
            </div>
        </nav>
    );
}
export default Nav;
