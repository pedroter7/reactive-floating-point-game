import React from "react";

class GameOverScreen extends React.Component {

    constructor(props) {
        super(props);

        this.onGameRestart = this.onGameRestart.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    onGameRestart(e) {
        this.props.onGameRestart();
    }

    handleKeyDown(e) {
        if (e.code == 'Enter') this.onGameRestart();
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
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