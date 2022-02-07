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
            left: `${this.props.x}px`,
            transform: 'translateY(-100%)'
        }

        return (
            <div className="obstacle" style={style}></div>
        );
    }

}

export default Obstacle;