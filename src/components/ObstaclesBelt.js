/**
 * This file is part of the Reactive Floating Point Game Project.
 * 
 * The project is licensend under the MIT Open Source License.
 * 
 * Project repository: https://github.com/pedroter7/reactive-floating-point-game
 * 
 * Author: Pedro T Freidinger
 */

import React from "react";
import { insertOrRemoveFromCollisionAreaIfNeeded } from "../logic/collisions";
import Obstacle from "./Obstacle";

class ObstaclesBelt extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            speed: props.speed
        };

        this.move = this.move.bind(this);
        this.newObstacle = this.newObstacle.bind(this);
    }

    componentDidMount() {
        this.moveInterval = setInterval(this.move, this.state.speed.ms, this.state.speed.step);
        this.newObstacleInterval = setInterval(this.newObstacle, this.props.newObstacleInterval);
    }

    componentWillUnmount() {
        clearInterval(this.moveInterval);
        clearInterval(this.newObstacleInterval);
    }

    move(step) {
        if (this.props.moving) {
            const obstaclesArray = this.props.obstacleController.getAll();
            for (let i = 0; i < obstaclesArray.length; ++i) {
                const obstacle = obstaclesArray[i];
                obstacle.x -= step;
                if (obstacle.x < 0) {
                    if (obstacle.width + obstacle.x > 0) {
                        obstacle.width += obstacle.x;
                        obstacle.x = 0;
                    } else {
                        this.props.obstacleController.remove(i);
                        continue;
                    }
                } else if (obstacle.x + obstacle.maxWidth > this.props.size) {
                    if (this.props.size - obstacle.x > obstacle.maxWidth)
                        obstacle.width = obstacle.maxWidth;
                    else obstacle.width = this.props.size - obstacle.x;
                } else {
                    obstacle.width = obstacle.maxWidth;
                }
                this.props.obstacleController.update(i, obstacle);
                insertOrRemoveFromCollisionAreaIfNeeded(obstacle.id, {
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

    newObstacle() {
        if (this.props.moving) {
            const idx = this.props.obstacleController.generate();
            const newObstacle = this.props.obstacleController.get(idx);
            newObstacle.x = this.props.size + newObstacle.width;
            newObstacle.maxWidth = newObstacle.width;
            newObstacle.width = 0;
            this.props.obstacleController.update(idx, newObstacle);
        }
    }

    render() {

        const obstaclesArray = this.props.obstacleController.getAll();

        return (<div id="obstacles-belt">
            {
                obstaclesArray.map(o => <Obstacle width={o.width}
                    height={o.height}
                    y={o.y}
                    x={o.x}
                    cssTransform={o.cssTransform}
                    key={o.id}
                    difficulty={this.props.difficulty} />)
            }
        </div>);
    }

}

export default ObstaclesBelt;