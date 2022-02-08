import Observable from "./Observable";

const objectsWithinCollisionArea = new Map(); // object key:object dimensions
const collisionArea = {
    x1: 0,
    x2: 1,
    y1: 0,
    y2: 1
};

const playerCollisionObservable = new Observable();

function registerPlayerCollisionObserver(observerFunction) {
    return playerCollisionObservable.registerObserver(observerFunction);
}

function unregisterPlayerCollisionObserver(observerId) {
    playerCollisionObservable.unregisterObserver(observerId);
}

function notifyPlayerCollision(playerPosition) {
    playerCollisionObservable.notifyObservers({playerPosition});
}

function axisAlignedBoundingBoxCollision(rectangle1, rectangle2) {
    return (rectangle1.x1 < rectangle2.x2 &&
        rectangle1.x2 > rectangle2.x1 &&
        rectangle1.y1 < rectangle2.y2 &&
        rectangle1.y2 > rectangle2.y1);
}

function checkPlayerCollision(playerPosition, playerDimensions) {
    const playerX1 = playerPosition.x - playerDimensions.radius;
    const playerX2 = playerPosition.x + playerDimensions.radius;
    const playerY1 = playerPosition.y - playerDimensions.radius;
    const playerY2 = playerPosition.y + playerDimensions.radius;

    for (const objDimensions of objectsWithinCollisionArea.values()) {
        if (axisAlignedBoundingBoxCollision({
            x1: playerX1, 
            x2: playerX2, 
            y1: playerY1, 
            y2: playerY2}, objDimensions)) {
                notifyPlayerCollision(playerPosition);
                return true;
            }
    }
    return false;
}

function updateCollisionArea(playerPosition, playerDimensions) {
    collisionArea.x1 = playerPosition.x - playerDimensions.radius*5;
    collisionArea.x2 = playerPosition.x + playerDimensions.radius*5;
    collisionArea.y1 = playerPosition.y - playerDimensions.radius*5;
    collisionArea.y2 = playerPosition.y + playerDimensions.radius*5;
}

function insertOrRemoveFromCollisionAreaIfNeeded(objectKey, objDimensions) {
    if (axisAlignedBoundingBoxCollision(collisionArea, objDimensions))
        objectsWithinCollisionArea.set(objectKey, objDimensions);
    else if (objectsWithinCollisionArea.get(objectKey))
        objectsWithinCollisionArea.delete(objectKey);
}

export {
    checkPlayerCollision,
    updateCollisionArea,
    insertOrRemoveFromCollisionAreaIfNeeded,
    registerPlayerCollisionObserver,
    unregisterPlayerCollisionObserver
};