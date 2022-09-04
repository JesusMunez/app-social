import React from "react";

import '../app-header/app-header.css'

const AppHeader = ({allLike, allPost}) => {
    let note = 'записей';
    if (allPost === 2 || allPost === 3 || allPost === 4) {
        note = 'записи'
    }
    else if (allPost === 1) note = 'запись';
    return (
        <div className="app-header d-flex">
            <h1>Andrew Avdyukov</h1>
            <h2>{allPost} {note}, из них понравилось {allLike}</h2>
        </div>
    )
}

export default AppHeader;