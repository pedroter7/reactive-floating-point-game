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
import Player from "./Player";
import { playerNextPosition, PLAYER_VERTICAL_STEP } from "../logic/playerRules";
import ObstaclesBelt from "./ObstaclesBelt";
import { checkPlayerCollision, updateCollisionArea, registerPlayerCollisionObserver, unregisterPlayerCollisionObserver, clearCollisionArea } from "../logic/collisions";
import ObstacleController from "../logic/obstacleModel";
import PlayerScoreController from "../logic/playerScoreModel";
import { DifficultyEnum, getDifficulty } from "../logic/difficultyRules";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerPosition: {
                x: Math.floor(this.props.playingAreaWidth/2),
                y: Math.floor(this.props.playingAreaHeight/2)
            },
            paused: false,
            playerScore: 0,
            difficulty: DifficultyEnum.EASY
        }
        this.playerDiameter = 15;
        this.playerDimensions = {
            radius: this.playerDiameter/2
        };
        this.playingAreaDimensions = {
            width: this.props.playingAreaWidth,
            height: this.props.playingAreaHeight
        }

        // Obstacles configuration
        this.obstacleMovementSpeed = {
            ms: 10,
            step: 1
        };
        this.obstacleGenerationFrequency = 1700; // ms
        this.obstacleController = ObstacleController.getInstance();
        this.obstacleController.configureObstacleGeneration({ 
            playingAreaDimensions: this.playingAreaDimensions, 
            obstacleMovementSpeed: this.obstacleMovementSpeed.step/this.obstacleMovementSpeed.ms, 
            obstacleGenerationFrequency: this.obstacleGenerationFrequency, 
            playerMovementStep: PLAYER_VERTICAL_STEP, 
            difficulty: this.state.difficulty, 
            width: 50 });

        this.props.onDifficultyChange(this.state.difficulty);

        this.playerScoreController = PlayerScoreController.getInstance(this.obstacleController);

        updateCollisionArea(this.state.playerPosition, this.playerDimensions);

        if (props.gameIsRestarting) {
            clearCollisionArea();
            this.obstacleController.clear();
            this.playerScoreController.clear();
            this.props.onScoreUpdate(0);
        }

        this.onPlayerMoveDown = this.onPlayerMoveDown.bind(this);
        this.onPlayerMoveUp = this.onPlayerMoveUp.bind(this);
        this.movePlayer = this.movePlayer.bind(this);
        this.onObstaclesBeltMove = this.onObstaclesBeltMove.bind(this);
        this.onKeydown = this.onKeydown.bind(this);
        this.testPlayerCollision = this.testPlayerCollision.bind(this);
        this.playerCollisionObserver = this.playerCollisionObserver.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeydown);
        this.playerCollisionObserverId = registerPlayerCollisionObserver(this.playerCollisionObserver);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeydown);
        unregisterPlayerCollisionObserver(this.playerCollisionObserverId);
    }

    onKeydown(e) {
        switch (e.code) {
            case 'KeyP':
                this.setState({paused: !this.state.paused});
                break;
            default:
                break;
        }
    }

    playerCollisionObserver() {
        this.props.onGameOver();
    }

    movePlayer(moveType) {
        if (this.props.getGameRunning() && !this.state.paused) {
            const nextPosition = playerNextPosition(this.state.playerPosition, moveType, this.playerDimensions, this.playingAreaDimensions);
            updateCollisionArea(nextPosition, this.playerDimensions);
            this.setState({playerPosition: nextPosition});
            this.testPlayerCollision(nextPosition);
        }
    }

    testPlayerCollision(playerPosition) {
        return checkPlayerCollision(playerPosition, this.playerDimensions);
    }

    onPlayerMoveUp() {
        this.movePlayer('UP');
    }

    onPlayerMoveDown() {
        this.movePlayer('DOWN');
    }

    onObstaclesBeltMove() {
        updateCollisionArea(this.state.playerPosition, this.playerDimensions);
        const collided = this.testPlayerCollision(this.state.playerPosition);
        if (!collided) {
            const newScore = this.playerScoreController.updateScore(this.state.playerPosition);
            if (newScore != this.state.playerScore) {
                const difficulty = getDifficulty(newScore);
                if (difficulty != this.state.difficulty) {
                    this.obstacleController.updateObstacleGenerationDifficulty(difficulty);
                    this.props.onDifficultyChange(difficulty);
                }
                this.setState({playerScore: newScore, difficulty});
                this.props.onScoreUpdate(newScore);
            }
        }
    }

    render() {
        const style = {
            width: '100%',
            height: '100%',
            margin: 0,
            position: 'relative'
        };

        return (
            <div id="game-area" style={style} >
                <ObstaclesBelt obstacleController={this.obstacleController}
                    onBeltMove={this.onObstaclesBeltMove}
                    size={this.props.playingAreaWidth}
                    speed={this.obstacleMovementSpeed}
                    moving={this.props.getGameRunning() && !this.state.paused}
                    newObstacleInterval={this.obstacleGenerationFrequency}
                    difficulty={this.state.difficulty} />
                <Player x={this.state.playerPosition.x}
                    y={this.state.playerPosition.y}
                    diameter={this.playerDiameter}
                    onMoveUp={this.onPlayerMoveUp}
                    onMoveDown={this.onPlayerMoveDown} />
            </div>
          );
    }

}

export default Game;