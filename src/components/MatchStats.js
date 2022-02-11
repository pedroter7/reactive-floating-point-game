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
import DifficultyDisplay from "./DifficultyDisplay";
import ScoreCounter from "./ScoreCounter";

class MatchStats extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="match-stats" style={{width: this.props.width}}>
                <ScoreCounter scoreObservable={this.props.scoreObservable} />
                <DifficultyDisplay difficultyObservable={this.props.difficultyObservable} />
            </div>
        );
    }

}

export default MatchStats;