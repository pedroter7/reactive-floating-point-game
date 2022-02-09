import React from "react";

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
        return (
            <div>
            <h1>Hello!!!</h1>
            <button onClick={this.handlePlayClick}>Play!</button>
            </div>
        );
    }

}

export default WelcomeScreen;