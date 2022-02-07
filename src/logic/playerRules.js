function playerNextPosition(currentPosition, moveType, playerDimensions, playingAreaDimensions) {
    const step = 15;
    const nextPosition = {
        x: currentPosition.x
    }
    switch (moveType.toUpperCase()) {
        case 'UP':
            nextPosition.y = currentPosition.y - step;
            break;
        case 'DOWN':
            nextPosition.y = currentPosition.y + step;
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
    playerNextPosition
};