import React from "react";

class PlayingArea extends React.Component {

    render() {
        const style = {
            width: this.props.width,
            height: this.props.height
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