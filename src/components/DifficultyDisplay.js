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
import { DifficultyEnum } from "../logic/difficultyRules";

class DifficultyDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            difficulty: DifficultyEnum.EASY
        }

        this.onDifficultyChange = this.onDifficultyChange.bind(this);
    }

    componentDidMount() {
        this.difficultyObservableId = this.props.difficultyObservable.registerObserver(this.onDifficultyChange);
    }

    componentWillUnmount() {
        this.props.difficultyObservable.unregisterObserver(this.difficultyObservableId);
    }

    onDifficultyChange(extraObj) {
        this.setState({difficulty: extraObj.difficulty});
    }

    render() {
        let difficultyText = undefined;
        switch (this.state.difficulty) {
            case DifficultyEnum.EASY:
                difficultyText = "EASY";
                break;
            case DifficultyEnum.MEDIUM:
                difficultyText = "MEDIUM";
                break;
            case DifficultyEnum.HARD:
                difficultyText = "HARD";
                break;
            default:
                difficultyText = "EXTREME";
                break;
        }

        const textStyle = {
            fontSize: `${this.props.fontSize}px`
        };

        const counterStyle = {
            fontSize: `${this.props.fontSize*1.50}px`,
            marginLeft: '1ch'
        }

        return (
            <div id="difficulty-display" style={textStyle}>
                Difficulty <div id="difficulty" style={counterStyle}>{difficultyText}</div>
            </div>
        );

    }

}

export default DifficultyDisplay;