// FILEPATH: /d:/zacle/dev/FantasyFootballAI/test/index.test.ts

import MCTS from "./mcts/classes/mcts";
import State from "./mcts/classes/state";

let state = new State();
let mcts = new MCTS(state);
let move: number;

describe('MCTS run method', () => {
    beforeEach(() => {
        move = mcts.run(100000);
    });

    test('should return a move', () => {
        expect(move).toBeDefined();
    });

    test('should return a valid move', () => {
        // Replace this with your own validation logic
        const isValidMove = validateMove(move);
        expect(isValidMove).toBe(true);
    });

    test('should run within a reasonable time', () => {
        const start = Date.now();
        mcts.run(100000);
        const end = Date.now();
        const elapsed = end - start;
        expect(elapsed).toBeLessThan(5000); // for example, expect it to run in less than 5 seconds
    });
});

function validateMove(move: number) {
    if (state.getPossibleMoves().includes(move)) {
        return true;
    }

    return false;
}