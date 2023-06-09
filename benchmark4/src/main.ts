import Game from "./Wolfie2D/Loop/Game";
import MainMenu from "./hw3/Scenes/MainMenu";
import { HW3Controls } from "./hw3/HW3Controls";

// The main function is your entrypoint into Wolfie2D. Specify your first scene and any options here.
(function main(){

    // Set up options for our game
    let options = {
        canvasSize: {x: 1200, y: 800},          // The size of the game
        clearColor: {r: 34, g: 32, b: 52},   // The color the game clears to
        inputs: [
            {name: HW3Controls.MOVE_LEFT, keys: ["a"]},
            {name: HW3Controls.MOVE_RIGHT, keys: ["d"]},
            {name: HW3Controls.MOVE_UP, keys: ["w"]},
            {name: HW3Controls.MOVE_DOWN, keys: ["s"]},
            {name: HW3Controls.LEVEL_1, keys: ["1"]},
            {name: HW3Controls.LEVEL_2, keys: ["2"]},
            {name: HW3Controls.LEVEL_3, keys: ["3"]},
            {name: HW3Controls.LEVEL_4, keys: ["4"]},
            {name: HW3Controls.LEVEL_5, keys: ["5"]},
            {name: HW3Controls.LEVEL_6, keys: ["6"]}
        ],
        useWebGL: false,                        // Tell the game we want to use webgl
        showDebug: false                       // Whether to show debug messages. You can change this to true if you want
    }

    // Create a game with the options specified
    const game = new Game(options);

    // Start our game
    game.start(MainMenu, {});
})();