/**
 * This file is part of the Reactive Floating Point Game Project.
 * 
 * The project is licensend under the MIT Open Source License.
 * 
 * Project repository: https://github.com/pedroter7/reactive-floating-point-game
 * 
 * Author: Pedro T Freidinger
 */

/**
 * This file describes the collision engine for the game.
 * 
 * The 2D collision method implemented is the Axis Alligned
 * Bound Box and every object is treated as a rectangle.
 * 
 * Since the game doesn't use a 2D mesh, a collision area
 * is used to keep track of the objects that are relatively
 * near the player in a given moment.
 */

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

function clearCollisionArea() {
    objectsWithinCollisionArea.clear();
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
    unregisterPlayerCollisionObserver,
    clearCollisionArea
};