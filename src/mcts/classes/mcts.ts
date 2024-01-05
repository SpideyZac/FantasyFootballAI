import Node from "./tree";
import State from "./state";

export default class MCTS {
    root: Node;

    constructor(rootState: State) {
        this.root = new Node(rootState, null, null);
    }

    public select(): Node {
        let node = this.root;

        while (node.children.length > 0 && node.state.getWinner() === 0 && node.state.getPossibleMoves().length !== node.children.length) {
            node = node.children.reduce((a, b) => a.getUCB() > b.getUCB() ? a : b);
        }

        return node;
    }

    public expand(node: Node): void {
        const possibleMoves = node.state.getPossibleMoves();

        for (const move of possibleMoves) {
            const state = node.state.clone();
            state.makeMove(move);

            node.children.push(new Node(state, move, node));
        }
    }

    public simulate(node: Node): number {
        const state = node.state.clone();

        while (state.getWinner() === 0 && !state.tie()) {
            const possibleMoves = state.getPossibleMoves();
            const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

            state.makeMove(move);
        }

        return state.getWinner();
    }

    public backpropagate(node: Node, winner: number): void {
        while (node !== null) {
            node.visits++;
            node.score += winner * node.state.player === 1 ? 1 : -1;

            node = node.parent!;
        }
    }

    public run(iterations: number): number {
        for (let i = 0; i < iterations; i++) {
            const node = this.select();

            if (node.state.getWinner() !== 0 || node.state.tie()) {
                this.backpropagate(node, node.state.getWinner());
            } else {
                this.expand(node);

                const winner = this.simulate(node.children[Math.floor(Math.random() * node.children.length)]);

                this.backpropagate(node, winner);
            }
        }

        return this.root.children.reduce((a, b) => a.visits > b.visits ? a : b).move!;
    }
}