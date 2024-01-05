export default class State {
    constructor(
        public board: number[] = [0, 0, 0, 0, 0, 0, 0, 0],
        public player: number = 1,
    ) {}

    public clone(): State {
        return new State(this.board.slice(), this.player);
    }

    public getWinner(): number {
        for (let i = 0; i < 6; i++) {
            if (this.board[i] === this.board[i + 1] && this.board[i] === this.board[i + 1] && this.board[i] !== 0) {
                return this.board[i];
            }
        }

        return 0;
    }

    public tie(): boolean {
        return this.board.every((value) => value !== 0);
    }

    public makeMove(move: number): void {
        this.board[move] = this.player;
        this.player = -this.player;
    }

    public getPossibleMoves(): number[] {
        const moves: number[] = [];

        for (let i = 0; i < 8; i++) {
            if (this.board[i] === 0) {
                moves.push(i);
            }
        }

        return moves;
    }
}