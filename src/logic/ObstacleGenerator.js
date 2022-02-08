export default class ObstacleGenerator {

    constructor(playingAreaDimensions) {
        this.playingAreaDimensions = playingAreaDimensions;

        this.generate = this.generate.bind(this);
    }

    generate() {
        const height = Math.floor(this.playingAreaDimensions.height/3);
        return {
            height,
            width: 50,
            y: 180,
        };
    }

}