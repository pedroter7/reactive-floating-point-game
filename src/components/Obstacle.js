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

class Obstacle extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const style = {
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
            position: 'absolute',
            top: `${this.props.y}px`,
            left: `${this.props.x}px`
        }

        return (
            <div className="obstacle" style={style}></div>
        );
    }

}

export default Obstacle;