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

class PlayingArea extends React.Component {

    render() {
        const style = {
            width: this.props.width,
            height: this.props.height
        }

        return (
            <div className="playing-area"
                id="playing-area"
                style={style}>

                {this.props.children}

            </div>
        );
    }
}

export default PlayingArea;