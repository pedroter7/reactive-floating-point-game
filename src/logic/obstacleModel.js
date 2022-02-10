import { binarySearch } from "../common/algorithm";

class ObstacleModel {

    constructor() {
        this.obstacles = [];
        this.idCounter = 0;
    }

}

class ObstacleController {

    static instance = null;

    static getInstance(playingAreaDimensions) {
        if (ObstacleController.instance == null)
            ObstacleController.instance = new ObstacleController(playingAreaDimensions);
        return ObstacleController.instance;
    }

    constructor(playingAreaDimensions) {
        this.playingAreaDimensions = playingAreaDimensions;
        this._model = new ObstacleModel();

        this.generate = this.generate.bind(this);
        this.clear = this.clear.bind(this);
        this.remove = this.remove.bind(this);
        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
    }

    generate() {
        const height = Math.floor(this.playingAreaDimensions.height/3);
        const newObstacle = {
            height,
            width: 40,
            y: 180,
            id: this._model.idCounter++
        };
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