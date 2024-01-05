export default class State {
    constructor() {}

    public clone(): State {
        return new State();
    }

    public isDone(): boolean {
        return true;
    }

    public getReward(): number {
        return 0;
    }

    public makeMove(move: any): void {
        
    }

    public getPossibleMoves(): any[] {
        const moves: number[] = [];

        return moves;
    }
}