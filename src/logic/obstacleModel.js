/**
 * This file is part of the Reactive Floating Point Game Project.
 * 
 * The project is licensend under the MIT Open Source License.
 * 
 * Project repository: https://github.com/pedroter7/reactive-floating-point-game
 * 
 * Author: Pedro T Freidinger
 */

import { binarySearch, randomFloat, randomInt } from "../common/algorithm";
import { DifficultyEnum } from "./difficultyRules";

class ObstacleModel {

    constructor() {
        this.obstacles = [];
        this.idCounter = 0;
    }

}

// Controll variable for the obstacle generation algorithm
let followedObstaclesInSameDirection = 0;

/**
 * Algorithm to generate a new obstacle based on the last obstacle position
 * and current game difficulty. The algorithm supposes that every obstacle
 * has the same constant width.
 * 
 * The algorithm generates a new obstacle using a calculated average player
 * vertical movement speed, the obstacle movement speed, obstacle generation
 * frequency and obstacles' width.
 * 
 * Obstacle generation frequency, obstacle width and obstacle movement speed
 * are used to calculate how long the player will be able to move itself between
 * the last obstacle and the new being created.
 * 
 * Player average vertical movement speed is decided based on the current 
 * game difficulty and is used to calculate a maximum theoretical average
 * distance that the player would be able to travel in the y axis during the
 * time span that there is no obstacles above or below her. A fraction of
 * this value is then used to decide where the beginning of the new obstacle
 * will be positioned on the y axis. The fraction is set based on the current
 * game difficulty as well.
 */
function obstacleGenerationAlgorithm({ lastObstacle, playingAreaDimensions, 
    obstacleMovementSpeed, obstacleGenerationFrequency, 
    playerMovementStep, difficulty, width }) {

    // Maximum and minimum gap that the player can pass through
    const obstacleSpaceMax = playerMovementStep*4;
    const obstacleSpaceMin = playerMovementStep*2.5;
    let obstaclePin = randomInt(0,1); // 0 pinned up, 1 pinned down

    let height = undefined;
    let y = undefined;

    if (lastObstacle == null) {
        height = randomInt(obstacleSpaceMax, playingAreaDimensions.height-obstacleSpaceMin);
        y = obstaclePin == 0 ? 0 : playingAreaDimensions.height - height;
    } else {
        // Player average vertical movement speed
        let averageHitsPerSecond = undefined;
        if (difficulty == DifficultyEnum.EASY) {
            averageHitsPerSecond = 0.002;
        } else if (difficulty == DifficultyEnum.MEDIUM) {
            averageHitsPerSecond = 0.0025;
        } else if (difficulty == DifficultyEnum.HARD) {
            averageHitsPerSecond = 0.003;
        } else {
            averageHitsPerSecond = 0.004;
        }

        // theoretical average distance
        const averagePlayerVerticalSpeed = averageHitsPerSecond*playerMovementStep;
        let maxAverageVerticalMovement = averagePlayerVerticalSpeed * (obstacleGenerationFrequency - (obstacleMovementSpeed * width) );

        // Define how smaller the diagonal between the obstacles will be based on the current difficulty
        let fraction = undefined;
        if (difficulty == DifficultyEnum.EASY) {
            fraction = randomFloat(0.3, 0.5);
        } else if (difficulty == DifficultyEnum.MEDIUM) {
            fraction = randomFloat(0.5, 0.7);
        } else if (difficulty == DifficultyEnum.HARD) {
            fraction = randomFloat(0.7, 0.9);
        } else {
            fraction = randomFloat(0.9, 1);
        }
        maxAverageVerticalMovement *= fraction;

        let referenceY = undefined;
        let lastObstaclePinning = undefined;
        
        // Define last obstacle pinning
        if (lastObstacle.y == 0) {
            // Pinned up
            referenceY = lastObstacle.height;
            lastObstaclePinning = 0;
        } else {
            // Pinned down
            referenceY = playingAreaDimensions.height - lastObstacle.height;
            lastObstaclePinning = 1;
        }

        // Prevent having too many obstacles pinned to the same direction
        if (lastObstaclePinning == obstaclePin) {
            followedObstaclesInSameDirection++;
            if (followedObstaclesInSameDirection > 2) {
                obstaclePin = obstaclePin == 0 ? 1 : 0;
            }
        } else {
            followedObstaclesInSameDirection = 0;
        }

        // Define if next hole will be above or below from last obstacle
        if (referenceY - maxAverageVerticalMovement < obstacleSpaceMin) {
            // above
            y = referenceY + maxAverageVerticalMovement;
        } else if (playingAreaDimensions.height - (referenceY + maxAverageVerticalMovement) < obstacleSpaceMin) {
            // below
            y = referenceY - maxAverageVerticalMovement;
        } else {
            // random
            y = randomInt(0,1) == 0 ? referenceY + maxAverageVerticalMovement : referenceY - maxAverageVerticalMovement;
        }

        if (obstaclePin == 0) {
            // Pinned up
            height = y;
            y = 0;
        } else {
            // Pinned down
            height = playingAreaDimensions.height - y;
        } 

    }

    return {
        height,
        y,
        width
    };

}

class ObstacleController {

    static instance = null;

    static getInstance() {
        if (ObstacleController.instance == null)
            ObstacleController.instance = new ObstacleController();
        return ObstacleController.instance;
    }

    constructor() {
        this._model = new ObstacleModel();

        this.generate = this.generate.bind(this);
        this.clear = this.clear.bind(this);
        this.remove = this.remove.bind(this);
        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
        this.configureObstacleGeneration = this.configureObstacleGeneration.bind(this);
        this.updateObstacleGenerationDifficulty = this.updateObstacleGenerationDifficulty.bind(this);
    }

    configureObstacleGeneration(parameters) {
        this._generationParams = parameters;
    }

    updateObstacleGenerationDifficulty(newDifficulty) {
        this._generationParams.difficulty = newDifficulty;
    }

    generate() {
        this._generationParams.lastObstacle = this._model.obstacles.length == 0 ? null : this._model.obstacles[this._model.obstacles.length-1];
        const newObstacle = obstacleGenerationAlgorithm(this._generationParams);

        newObstacle.id = this._model.idCounter++;

        return this._model.obstacles.push(newObstacle) - 1;
    }

    clear() {
        this._model.obstacles.length = 0;
    }

    remove(index) {
        this._model.obstacles.splice(index, 1);
    }

    getAll() {
        return this._model.obstacles;
    }

    get(idx) {
        return this._model.obstacles[idx];
    }

    findById(id) {
        return binarySearch(this._model.obstacles, id, "id");
    }

    update(index, obstacle) {
        this._model.obstacles[index] = obstacle;
    }

}

export default ObstacleController;