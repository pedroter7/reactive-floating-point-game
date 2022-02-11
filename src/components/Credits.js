/**
 * This file is part of the Reactive Floating Point Game Project.
 * 
 * The project is licensend under the MIT Open Source License.
 * 
 * Project repository: https://github.com/pedroter7/reactive-floating-point-game
 * 
 * Author: Pedro T Freidinger
 */

import React from "react";

class Credits extends React.Component {

    static AUTHOR = "Pedro T Freidinger";
    static PROJECT_REPO = "https://github.com/pedroter7/reactive-floating-point-game";

    render() {
        return (
            <div className="credits">
                Made by <span id="author-name">{Credits.AUTHOR}</span>, <a href={Credits.PROJECT_REPO} id="projec-repo" target="_blank">click here to see the project code.</a>
            </div>
        );
    }

}

export default Credits;