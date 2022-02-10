import React from "react";

class ScoreCounter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score: 0
        }

        this.onScoreChange = this.onScoreChange.bind(this);
    }

    componentDidMount() {
        this.scoreObserverId = this.props.scoreObservable.registerObserver(this.onScoreChange);
    }

    componentWillUnmount() {
        this.props.scoreObservable.unregisterObserver(this.scoreObserverId);
    }

    onScoreChange(extraObj) {
        this.setState({score: extraObj.newScore});
    }

    render() {
        return (
        <div id="score-counter">
            Score: <span id="score">{this.state.score}</span>
        </div>);
    }

}

export default ScoreCounter;