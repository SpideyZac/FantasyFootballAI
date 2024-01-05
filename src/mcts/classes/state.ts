/**
    * State class
    * @export
    * @class State
*/
export default class State {
    /**
        * Creates an instance of State.
        * @memberof State
        * @public
    */
    constructor() {}

    /**
        * Clones the state.
        * @returns The cloned state.
        * @memberof State
        * @public
    */
    public clone(): State {
        return new State();
    }

    /**
        * Checks if the state is done.
        * @returns Whether or not the state is done.
        * @memberof State
        * @public
    */
    public isDone(): boolean {
        return true;
    }

    /**
        * Gets the reward of the state (relative to the current player).
        * @returns The reward of the state.
        * @memberof State
        * @public
    */
    public getReward(): number {
        return 0;
    }

    /**
        * Makes a move.
        * @param move The move to make.
        * @memberof State
        * @public
    */
    public makeMove(move: any): void {
        
    }

    /**
        * Gets all possible moves.
        * @returns All possible moves.
        * @memberof State
        * @public
    */
    public getPossibleMoves(): any[] {
        const moves: number[] = [];

        return moves;
    }
}