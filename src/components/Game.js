import React from "react";
import Player from "./Player";
import { playerNextPosition } from "../logic/playerRules";
import ObstaclesBelt from "./ObstaclesBelt";
import { checkPlayerCollision, updateCollisionArea, registerPlayerCollisionObserver, unregisterPlayerCollisionObserver } from "../logic/collisions";
import ObstacleGenerator from "../logic/ObstacleGenerator";

class Game extends React.Component {

    static zIndex = 0;

    constructor(props) {
        super(props);
        this.state = {
            playerPosition: {
                x: Math.floor(this.props.playingAreaWidth/2),
                y: Math.floor(this.props.playingAreaHeight/2)
            },
            paused: false
        }
        this.playerDiameter = 15;
        this.playerDimensions = {
            radius: this.playerDiameter/2
        };
        this.playingAreaDimensions = {
            width: this.props.playingAreaWidth,
            height: this.props.playingAreaHeight
        }
        this.obstacleGenerator = new ObstacleGenerator(this.playingAreaDimensions);

        updateCollisionArea(this.state.playerPosition, this.playerDimensions);

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
        checkPlayerCollision(playerPosition, this.playerDimensions);
    }

    onPlayerMoveUp() {
        this.movePlayer('UP');
    }

    onPlayerMoveDown() {
        this.movePlayer('DOWN');
    }

    onObstaclesBeltMove() {
        updateCollisionArea(this.state.playerPosition, this.playerDimensions);
        this.testPlayerCollision(this.state.playerPosition);
    }

    render() {
        return (
            <div width={`${this.props.playingAreaWidth}px`} 
                height={`${this.props.playingAreaHeight}px`} 
                style={{position:'relative', margin: 0}} >
                <ObstaclesBelt obstacleGenerator={this.obstacleGenerator}
                    onBeltMove={this.onObstaclesBeltMove}
                    size={this.props.playingAreaWidth}
                    speed={{ms: 100, step: 10}}
                    moving={this.props.getGameRunning() && !this.state.paused}
                    newObstacleInterval={1500} />
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