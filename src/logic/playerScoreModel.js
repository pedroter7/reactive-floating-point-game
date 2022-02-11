/**
 * This file is part of the Reactive Floating Point Game Project.
 * 
 * The project is licensend under the MIT Open Source License.
 * 
 * Project repository: https://github.com/pedroter7/reactive-floating-point-game
 * 
 * Author: Pedro T Freidinger
 */

class PlayerScoreModel {

    constructor() {
        this.score = 0;
        this.lastObstacleId = -1;
    }

}

class PlayerScoreController {

    static _instance = null;

    static getInstance(obstacleController) {
        if (PlayerScoreController._instance == null)
            PlayerScoreController._instance = new PlayerScoreController(obstacleController);

        return PlayerScoreController._instance;
    }

    constructor(obstacleController) {
        this._model = new PlayerScoreModel();
        this._obstacleController = obstacleController;

        this.getScore = this.getScore.bind(this);
        this.clear = this.clear.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this._firstUpdate = this._firstUpdate.bind(this);
        this._updateFromIndex = this._updateFromIndex.bind(this);
    }

    getScore() {
        return this._model.score;
    }

    clear() {
        this._model.score = 0;
        this._model.lastObstacleId = -1;
    }

    updateScore(playerPosition) {
        if (this._model.lastObstacleId < 0) 
            this._firstUpdate(playerPosition);
        else {
            this._updateFromIndex(this._obstacleController.findById(this._model.lastObstacleId) + 1, playerPosition);
        }

        return this._model.score;
    }

    _updateFromIndex(i, playerPosition) {
        let obstacle = this._obstacleController.get(i);
        while (obstacle && obstacle.x + obstacle.width <= playerPosition.x) {
            this._model.score++;
            this._model.lastObstacleId = obstacle.id;
            obstacle = this._obstacleController.get(++i);
        }
    }

    _firstUpdate(playerPosition) {
        const obstaclesArray = this._obstacleController.getAll();
        for (const obstacle of obstaclesArray) {
            if (obstacle.x + obstacle.width > playerPosition.x) break;
            
            this._model.score++;
            this._model.lastObstacleId = obstacle.id;
        }
    }

}

export default PlayerScoreController;