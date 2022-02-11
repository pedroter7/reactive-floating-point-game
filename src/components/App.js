/**
 * This file is part of the Reactive Floating Point Game Project.
 * 
 * The project is licensend under the MIT Open Source License.
 * 
 * Project repository: https://github.com/pedroter7/reactive-floating-point-game
 * 
 * Author: Pedro T Freidinger
 */

import React from 'react';
import '../styles/App.css';
import PlayingArea from './PlayingArea';
import WelcomeScreen from './WelcomeScreen';
import Game from './Game';
import GameOverScreen from './GameOverScreen';
import Observable from '../logic/Observable';
import MatchStats from './MatchStats';
import Credits from './Credits';

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
    this.difficultyObservable = new Observable();

    this.buildGame = this.buildGameComponent.bind(this);
    this.buildWelcomeScreen = this.buildWelcomeScreen.bind(this);
    this.doPlay = this.doPlay.bind(this);
    this.getGameRunning = this.getGameRunning.bind(this);
    this.onGameOver = this.onGameOver.bind(this);
    this.buildGameOverScreen = this.buildGameOverScreen.bind(this);
    this.onGameRestart = this.onGameRestart.bind(this);
    this.onScoreUpdate = this.onScoreUpdate.bind(this);
    this.onDifficultyChange = this.onDifficultyChange.bind(this);
  }

  getGameRunning() {
    return this.state.gameRunning;
  }

  onDifficultyChange(newDifficulty) {
    this.difficultyObservable.notifyObservers({difficulty: newDifficulty});
  }

  buildGameComponent() {
    return (<Game playingAreaWidth={this.playingAreaWidth} 
                  playingAreaHeight={this.playingAreaHeight} 
                  getGameRunning={this.getGameRunning}
                  onGameOver={this.onGameOver}
                  gameRestartObservable={this.gameRestartObservable}
                  gameIsRestarting={this.state.gameIsRestarting}
                  onScoreUpdate={this.onScoreUpdate}
                  onDifficultyChange={this.onDifficultyChange} />);
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
        currentScreen = this.buildGameComponent();
        break;
      case CurrentScreenEnum.GAMEOVER_SCREEN:
        currentScreen = this.buildGameOverScreen();
        break;

    };

    return (
      <div className="App">
        <MatchStats scoreObservable={this.scoreObservable}
          difficultyObservable={this.difficultyObservable}
          width={this.playingAreaWidth} />
        <PlayingArea
          width={this.playingAreaWidth}
          height={this.playingAreaHeight}>

            {currentScreen}

        </PlayingArea>
        <Credits />
      </div>
    );
  }

}

export default App;
