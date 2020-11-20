import React from "react";


function Search({ newSearch }) {
    return (
        <div className="search">
            <form className="form-inline">
                <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={e => newSearch(e)}
                />
            </form>
        </div>
    );
}
export default Search;
