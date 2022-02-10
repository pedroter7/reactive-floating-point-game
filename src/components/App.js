import React from 'react';
import '../styles/App.css';
import PlayingArea from './PlayingArea';
import WelcomeScreen from './WelcomeScreen';
import Game from './Game';
import GameOverScreen from './GameOverScreen';
import ScoreCounter from './ScoreCounter';
import Observable from '../logic/Observable';

class CurrentScreenEnum {

  static WELCOME_SCREEN = new CurrentScreenEnum();
  static GAME_SCREEN = new CurrentScreenEnum();
  static GAMEOVER_SCREEN = new CurrentScreenEnum();

}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameRunning: false,
      currentScreen: CurrentScreenEnum.WELCOME_SCREEN,
      gameIsRestarting: false
    }
    this.screenWidth = window.screen.width;
    this.screenHeight = window.screen.height;
    this.playingAreaWidth = Math.floor(this.screenWidth*0.85);
    this.playingAreaHeight = Math.floor(this.screenHeight/2);

    this.scoreObservable = new Observable();

    this.buildGame = this.buildGame.bind(this);
    this.buildWelcomeScreen = this.buildWelcomeScreen.bind(this);
    this.doPlay = this.doPlay.bind(this);
    this.getGameRunning = this.getGameRunning.bind(this);
    this.onGameOver = this.onGameOver.bind(this);
    this.buildGameOverScreen = this.buildGameOverScreen.bind(this);
    this.onGameRestart = this.onGameRestart.bind(this);
    this.onScoreUpdate = this.onScoreUpdate.bind(this);
  }

  getGameRunning() {
    return this.state.gameRunning;
  }

  buildGame() {
    return (<Game playingAreaWidth={this.playingAreaWidth} 
                  playingAreaHeight={this.playingAreaHeight} 
                  getGameRunning={this.getGameRunning}
                  onGameOver={this.onGameOver}
                  gameRestartObservable={this.gameRestartObservable}
                  gameIsRestarting={this.state.gameIsRestarting}
                  onScoreUpdate={this.onScoreUpdate} />);
  }

  buildWelcomeScreen() {
    return (<WelcomeScreen onPlay={this.doPlay} />);
  }

  buildGameOverScreen() {
    return (<GameOverScreen onGameRestart={this.onGameRestart} />);
  }

  doPlay(gameIsRestarting=false) {
    this.setState({gameRunning: true, currentScreen: CurrentScreenEnum.GAME_SCREEN, gameIsRestarting});
  }

  onGameOver() {
    this.setState({gameRunning: false, currentScreen: CurrentScreenEnum.GAMEOVER_SCREEN});
  }

  onGameRestart() {
    this.doPlay(true);
  }

  onScoreUpdate(newScore) {
    this.scoreObservable.notifyObservers({newScore});
  }

  render() {
    let currentScreen = null;

    switch (this.state.currentScreen) {
      case CurrentScreenEnum.WELCOME_SCREEN:
        currentScreen = this.buildWelcomeScreen();
        break;
      case CurrentScreenEnum.GAME_SCREEN:
        currentScreen = this.buildGame();
        break;
      case CurrentScreenEnum.GAMEOVER_SCREEN:
        currentScreen = this.buildGameOverScreen();
        break;

    };

    return (
      <div className="App">
        <ScoreCounter scoreObservable={this.scoreObservable} />
        <PlayingArea
          width={this.playingAreaWidth}
          height={this.playingAreaHeight}>

            {currentScreen}

        </PlayingArea>
      </div>
    );
  }

}

export default App;
