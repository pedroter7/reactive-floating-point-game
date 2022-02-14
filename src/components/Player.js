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

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            position: {
                x: props.x,
                y: props.y
            }
        }

        this.onKeyPress = this.onKeyPress.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveUp = this.moveUp.bind(this);
    }

    moveUp() {
        const currentY = this.state.position.y;
        this.setState({
            position: {
                y: currentY - 5
            }
        });
    }

    moveDown() {
        const currentY = this.state.position.y;
        this.setState({
            position: {
                y: currentY + 5
            }
        });
    }

    onKeyPress(e) {
        switch(e.code) {
            case 'KeyW':
            case 'ArrowUp':
                this.props.onMoveUp();
                break;
            case 'KeyS':
            case 'ArrowDown':
                this.props.onMoveDown();
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        if (!this.props.displayMode) {
            window.addEventListener('keydown', this.onKeyPress);
        }
    }

    componentWillUnmount() {
        if (!this.props.displayMode) {
            window.removeEventListener('keydown', this.onKeyPress);
        }
    }

    render() {
        const style = {
            position: 'absolute',
            left: `${this.props.x}px`,
            top: `${this.props.y}px`,
            transform: 'translate(-50%, -50%)',
            width: `${this.props.diameter}px`,
            height: `${this.props.diameter}px`
        }

        return (
            <div className="player"
                style={style}></div>
        );
    }

}

export default Player;