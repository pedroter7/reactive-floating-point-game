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

        const textStyle = {
            fontSize: `${this.props.fontSize}px`
        };

        const counterStyle = {
            fontSize: `${this.props.fontSize*1.50}px`,
            marginLeft: '1ch'
        }

        return (
        <div id="score-counter" style={textStyle}>
            Score <div id="score" style={counterStyle}>{this.state.score}</div>
        </div>);
    }

}

export default ScoreCounter;