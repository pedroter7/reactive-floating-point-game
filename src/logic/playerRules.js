/**
 * This file is part of the Reactive Floating Point Game Project.
 * 
 * The project is licensend under the MIT Open Source License.
 * 
 * Project repository: https://github.com/pedroter7/reactive-floating-point-game
 * 
 * Author: Pedro T Freidinger
 */

const PLAYER_VERTICAL_STEP = 10; // px

function playerNextPosition(currentPosition, moveType, playerDimensions, playingAreaDimensions) {
    const nextPosition = {
        x: currentPosition.x
    }
    switch (moveType.toUpperCase()) {
        case 'UP':
            nextPosition.y = currentPosition.y - PLAYER_VERTICAL_STEP;
            break;
        case 'DOWN':
            nextPosition.y = currentPosition.y + PLAYER_VERTICAL_STEP;
            break;
        default:
            nextPosition.y = currentPosition.y;
            break;
    }

    if (movementOutOfBounds(nextPosition, playerDimensions, playingAreaDimensions)) {
        if (moveType.toUpperCase() == 'UP') nextPosition.y = 0 + playerDimensions.radius;
        else nextPosition.y = playingAreaDimensions.height - playerDimensions.radius;
    }

    return nextPosition;
}

function movementOutOfBounds(nextPosition, playerDimensions, playingAreaDimensions) {
    if (nextPosition.y - playerDimensions.radius < 0) return true;
    if (nextPosition.y + playerDimensions.radius > playingAreaDimensions.height) return true;
    return false;
}

export {
    playerNextPosition,
    PLAYER_VERTICAL_STEP
};