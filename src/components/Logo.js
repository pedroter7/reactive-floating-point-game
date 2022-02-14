import React from "react";

class Logo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const gameLogoStyle = {
            fontSize: `${this.props.baseHeight}px`,
        };


        return (
            <div id="game-logo" style={gameLogoStyle}>
                <div id="game-logo__reactive-text">Reactive</div>
                <div id="game-logo__floating-text">Floating</div>
                <div id="game-logo__point-text">Point</div>
            </div>
        );
    }

}

export default Logo;