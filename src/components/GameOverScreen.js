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

class GameOverScreen extends React.Component {

    constructor(props) {
        super(props);

        this.onGameRestart = this.onGameRestart.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    onGameRestart(e) {
        this.props.onGameRestart();
    }

    handleKeyDown(e) {
        if (e.code == 'Enter') this.onGameRestart();
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        return (
            <div>
                <h1>Game Over!</h1>
                <button onClick={this.onGameRestart}>
                    Play again!
                </button>
            </div>
        );
    }

}

export default GameOverScreen;