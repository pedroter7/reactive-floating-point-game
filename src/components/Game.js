import React from "react";
import Player from "./Player";
import { playerNextPosition } from "../logic/playerRules";
import Obstacle from "./Obstacle";

class Game extends React.Component {

    static zIndex = 0;

    constructor(props) {
        super(props);
        this.state = {
            playerPosition: {
                x: Math.floor(this.props.playingAreaWidth/2),
                y: Math.floor(this.props.playingAreaHeight/2)
            }
        }
        this.playerDiameter = 15;

        this.onPlayerMoveDown = this.onPlayerMoveDown.bind(this);
        this.onPlayerMoveUp = this.onPlayerMoveUp.bind(this);
        this.movePlayer = this.movePlayer.bind(this);
    }

    movePlayer(moveType) {
        const playerDimensions = {radius: this.playerDiameter/2};
        const playingAreaDimensions = {
            width: this.props.playingAreaWidth,
            height: this.props.playingAreaHeight
        }
        const nextPosition = playerNextPosition(this.state.playerPosition, moveType, playerDimensions, playingAreaDimensions);
        this.setState({playerPosition: nextPosition});
    }

    onPlayerMoveUp() {
        this.movePlayer('UP');
    }

    onPlayerMoveDown() {
        this.movePlayer('DOWN');
    }

    render() {
        return (
            <div width={`${this.props.playingAreaWidth}px`} 
                height={`${this.props.playingAreaHeight}px`} 
                style={{position:'relative', margin: 0}} >
                <Player x={this.state.playerPosition.x}
                    y={this.state.playerPosition.y}
                    diameter={this.playerDiameter}
                    onMoveUp={this.onPlayerMoveUp}
                    onMoveDown={this.onPlayerMoveDown} />
                <Obstacle width={50}
                    height={Math.floor(this.props.playingAreaHeight/3)}
                    y={this.props.playingAreaHeight}
                    x={Math.floor(this.props.playingAreaWidth*0.6)} />
            </div>
          );
    }

}

export default Game;