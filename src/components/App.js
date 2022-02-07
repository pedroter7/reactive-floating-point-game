import React from 'react';
import '../styles/App.css';
import PlayingArea from './PlayingArea';
import WelcomeScreen from './WelcomeScreen';
import Game from './Game';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false
    }
    this.screenWidth = window.screen.width;
    this.screenHeight = window.screen.height;
    this.playingAreaWidth = Math.floor(this.screenWidth*0.85);
    this.playingAreaHeight = Math.floor(this.screenHeight/2);

    this.buildGame = this.buildGame.bind(this);
    this.buildWelcomeScreen = this.buildWelcomeScreen.bind(this);
    this.doPlay = this.doPlay.bind(this);
  }

  buildGame() {
    return (<Game playingAreaWidth={this.playingAreaWidth} playingAreaHeight={this.playingAreaHeight} />);
  }

  buildWelcomeScreen() {
    return (<WelcomeScreen onPlay={this.doPlay} />);
  }

  doPlay() {
    this.setState({playing: true});
  }

  render() {
    return (
      <div className="App">
        <PlayingArea
          width={this.playingAreaWidth}
          height={this.playingAreaHeight}>

          {this.state.playing 
            ? this.buildGame() 
            : this.buildWelcomeScreen()
          }

        </PlayingArea>
      </div>
    );
  }

}

export default App;
