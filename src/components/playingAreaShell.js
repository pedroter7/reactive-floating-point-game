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
import Credits from "./Credits";
import DifficultyDisplay from "./DifficultyDisplay";
import Logo from "./Logo";
import ScoreCounter from "./ScoreCounter";

class PlayingAreaShellBottom extends React.Component {

    render() {
        return (
            <div id="playing-area-shell-bottom">
                <Credits />
            </div>
        );
    }

}
 
class PlayingAreaShellTop extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="playing-area-shell-top" style={{width: this.props.width}}>
                <ScoreCounter scoreObservable={this.props.scoreObservable} fontSize={this.props.height} />
                <Logo baseHeight={this.props.height} />
                <DifficultyDisplay difficultyObservable={this.props.difficultyObservable} fontSize={this.props.height} />
            </div>
        );
    }

}

export {
    PlayingAreaShellTop,
    PlayingAreaShellBottom
};