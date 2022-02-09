import React from "react";

class GameOverScreen extends React.Component {

    constructor(props) {
        super(props);

        this.onGameRestart = this.onGameRestart.bind(this);
    }

    onGameRestart(e) {
        this.props.onGameRestart();
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