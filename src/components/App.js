import React from 'react';
import '../styles/App.css';
import PlayingArea from './PlayingArea';
import WelcomeScreen from './WelcomeScreen';
import Game from './Game';
import Observable from '../logic/Observable';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameRunning: false
    }
    this.screenWidth = window.screen.width;
    this.screenHeight = window.screen.height;
    this.playingAreaWidth = Math.floor(this.screenWidth*0.85);
    this.playingAreaHeight = Math.floor(this.screenHeight/2);

    this.buildGame = this.buildGame.bind(this);
    this.buildWelcomeScreen = this.buildWelcomeScreen.bind(this);
    this.doPlay = this.doPlay.bind(this);
    this.getGameRunning = this.getGameRunning.bind(this);
    this.onGameOver = this.onGameOver.bind(this);
  }

  getGameRunning() {
    return this.state.gameRunning;
  }

  buildGame() {
    return (<Game playingAreaWidth={this.playingAreaWidth} 
                  playingAreaHeight={this.playingAreaHeight} 
                  getGameRunning={this.getGameRunning}
                  onGameOver={this.onGameOver}
                  gameOverObservable={this.gameOverObservable} />);
  }

  buildWelcomeScreen() {
    return (<WelcomeScreen onPlay={this.doPlay} />);
  }

  doPlay() {
    this.setState({gameRunning: true});
  }

  onGameOver() {
    console.log("GameOver!");
    // this.setState({gameRunning: false});
  }

  render() {
    return (
      <div className="App">
        <PlayingArea
          width={this.playingAreaWidth}
          height={this.playingAreaHeight}>

          {this.state.gameRunning 
            ? this.buildGame() 
            : this.buildWelcomeScreen()
          }

        </PlayingArea>
      </div>
    );
  }

}

export default App;
