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
import Logo from "./Logo";
import Player from "./Player";

class WelcomeScreen extends React.Component {

    constructor(props) {
        super(props);

        this.handlePlayClick = this.handlePlayClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handlePlayClick() {
        this.props.onPlay();
    }

    handleKeyDown(e) {
        if (e.code == 'Enter') this.handlePlayClick();
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

        const playerContainerWidth = this.props.playingAreaWidth*0.1;
        const playerContainerHeight = this.props.playingAreaHeight*0.15;

        const playerContainerStyle = {
            width: `${playerContainerWidth}px`,
            height: `${playerContainerHeight}px`,
            background: 'none',
            position: 'relative',
            margin: '15px'
        };

        const buttonBoxStyle = {
            width: `${this.props.playingAreaWidth*0.3}px`,
            height: 'auto',
            margin: '15px'
        };

        const buttonStyle = {
            fontSize: `${this.props.playingAreaHeight*0.04}px`,
            padding: '1ch'
        };

        return (
            <div id="welcome-screen" style={style}>
                <Logo baseHeight={this.props.playingAreaHeight*0.08} />
                <div id="welcome-screen__player-container" style={playerContainerStyle}>
                    <Player x={playerContainerWidth/2}
                        y={playerContainerHeight/2}
                        diameter={playerContainerHeight*0.5}
                        displayMode={true} />
                </div>
                <div id="welcome-screen__button-box" style={buttonBoxStyle}>
                    <button className="game-button" style={buttonStyle} id="game-button__play" onClick={this.handlePlayClick}>Play</button>
                    <button className="game-button" style={buttonStyle} id="game-button__credits" onClick={this.props.onSeeCredits}>Credits</button>
                </div>
                <div id="welcome-screen__controlls-box">
                    <div className="welcome-screen__controll-info">Move up: <span className="welcome-screen__controll-info__key">ARROW UP</span></div>
                    <div className="welcome-screen__controll-info">Move down: <span className="welcome-screen__controll-info__key">ARROW DOWN</span></div>
                    <div className="welcome-screen__controll-info">Pause/Continue: <span className="welcome-screen__controll-info__key">P</span></div>
                </div>
            </div>
        );
    }

}

export default WelcomeScreen;