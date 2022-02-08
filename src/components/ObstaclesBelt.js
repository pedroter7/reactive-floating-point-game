import React from "react";
import { insertOrRemoveFromCollisionAreaIfNeeded } from "../logic/collisions";
import Obstacle from "./Obstacle";

class ObstaclesBelt extends React.Component {

    static keyN = 0;
    static obstacles = [];

    constructor(props) {
        super(props);
        this.state = {
            speed: props.speed
        };

        this.move = this.move.bind(this);
        this.getNewObstacle = this.getNewObstacle.bind(this);
        this.clearObstacles = this.clearObstacles.bind(this);
    }

    clearObstacles() {
        ObstaclesBelt.obstacles.length = 0;
    }

    componentDidMount() {
        this.moveInterval = setInterval(this.move, this.state.speed.ms, this.state.speed.step);
        this.newObstacleInterval = setInterval(this.getNewObstacle, this.props.newObstacleInterval);
    }

    componentWillUnmount() {
        clearInterval(this.moveInterval);
        clearInterval(this.newObstacleInterval);
    }

    move(step) {
        if (this.props.moving) {
            for (let i = 0; i < ObstaclesBelt.obstacles.length; ++i) {
                const obstacle = ObstaclesBelt.obstacles[i];
                obstacle.x -= step;
                if (obstacle.x < 0 && obstacle.width + obstacle.x > 0) {
                    obstacle.width += obstacle.x;
                    obstacle.x = 0;
                } else if (obstacle.x < 0) {
                    ObstaclesBelt.obstacles.splice(i--, 1);
                    continue;
                }
                insertOrRemoveFromCollisionAreaIfNeeded(obstacle.key, {
                    x1: obstacle.x,
                    x2: obstacle.x + obstacle.width,
                    y1: obstacle.y,
                    y2: obstacle.y + obstacle.height
                });
            }
            this.props.onBeltMove();
            this.forceUpdate();
        }
    }

    getNewObstacle() {
        if (this.props.moving) {
            const newObstacle = this.props.obstacleGenerator.generate();
            newObstacle.key = ObstaclesBelt.keyN++;
            newObstacle.x = this.props.size - newObstacle.width;
            ObstaclesBelt.obstacles.push(newObstacle);
        }
    }

    render() {
        return (<div id="obstacles-belt">
            {
                ObstaclesBelt.obstacles.map(o => <Obstacle width={o.width}
                    height={o.height}
                    y={o.y}
                    x={o.x}
                    cssTransform={o.cssTransform}
                    key={o.key} />)
            }
        </div>);
    }

}

export default ObstaclesBelt;