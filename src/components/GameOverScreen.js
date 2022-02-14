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
import { randomInt } from "../common/algorithm";

class GameOverScreen extends React.Component {

    constructor(props) {
        super(props);

        this.gameOverTexts = [
            "You can enter the red zone, but you can't touch the void rectangles.",
            "Since you are not a quantum point, you can't perform quantum tunneling!",
            "Nope, not this time!",
            "The more, the better!",
            "Let's pay the game dev a coffee!",
            "Wow, That was bad!",
            "How many languages do you speak?",
            "Have you ever tried ReactJs? Tastes really good.",
            "Don't forget to take a look at the credits from the game menu!",
            "You just sent a cute point to the universe void!"
        ];

        this.onGameRestart = this.onGameRestart.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    onGameRestart(e) {
        this.props.onGameRestart();
    }

    handleKeyDown(e) {
        if (e.code === 'Enter') this.onGameRestart();
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        const style = {
            width: '100%',
            height: '100%',
            margin: 0,
        };

        const buttonStyle = {
            fontSize: `${this.props.playingAreaHeight*0.04}px`,
            padding: '1ch'
        };

        const titleStyle = {
            fontSize: `${this.props.playingAreaHeight*0.15}px`,
            margin: '1ch'
        }

        const rand = randomInt(0, this.gameOverTexts.length - 1);
        const gameOverText = this.gameOverTexts[rand];

        return (
            <div id="game-over-screen" style={style}>
                <div id="game-over-screen__title" style={titleStyle}>Game Over!</div>
                <div id="game-over-screen__text">{gameOverText}</div>
                <button className="game-button" style={buttonStyle} id="game-button__play" onClick={this.onGameRestart}>Play Again</button>
            </div>
        );
    }

}

export default GameOverScreen;