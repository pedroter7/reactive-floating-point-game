/**
 * This file is part of the Reactive Floating Point Game Project.
 * 
 * The project is licensend under the MIT Open Source License.
 * 
 * Project repository: https://github.com/pedroter7/reactive-floating-point-game
 * 
 * Author: Pedro T Freidinger
 */

function binarySearch(array, target, property=null) {
    let left = 0;
    let right = array.length - 1;
    let middle = -1;
    while (right >= left) {
        middle = left + Math.floor((right-left)/2);
        const compareResult = compare(array, middle, target, property);
        if (compareResult == 0) return middle;
        else if (compareResult == 1) right = middle-1;
        else left = middle + 1;
    }

    return undefined;
}

function compare(array, index, target, property=null) {
    if (property) {
        if (array[index][property] == target) return 0;
        else if (array[index][property] < target) return -1;
        else return 1;
    } else {
        if (array[index] == target) return 0;
        else if (array[index] < target) return -1;
        else return 1;
    }
}

const randomInt = (min,max) => Math.round(randomFloat(min,max));

const randomFloat = (min,max) => Math.random() * (max-min) + min;

export {
    binarySearch,
    randomInt,
    randomFloat
};