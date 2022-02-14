/**
 * This file is part of the Reactive Floating Point Game Project.
 * 
 * The project is licensend under the MIT Open Source License.
 * 
 * Project repository: https://github.com/pedroter7/reactive-floating-point-game
 * 
 * Author: Pedro T Freidinger
 */

class DifficultyEnum {

    static EASY = 0;
    static MEDIUM = 1;
    static HARD = 2;
    static EXTREME = 3;

}

function getDifficulty(currentScore) {
    if (currentScore < 30) {
        return DifficultyEnum.EASY;
    } else if (currentScore < 50) {
        return DifficultyEnum.MEDIUM;
    } else if (currentScore < 80) {
        return DifficultyEnum.HARD;
    }

    return DifficultyEnum.EXTREME;
}

export {
    DifficultyEnum,
    getDifficulty
};