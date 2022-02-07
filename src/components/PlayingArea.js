import React from "react";

class PlayingArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: props.width,
            height: props.height
        };
    }

    render() {
        const style = {
            width: this.state.width,
            height: this.state.height
        }

        return (
            <div className="playing-area"
                id="playing-area"
                style={style}>

                {this.props.children}

            </div>
        );
    }
}

export default PlayingArea;