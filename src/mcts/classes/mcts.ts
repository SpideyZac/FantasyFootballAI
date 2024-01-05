import Node from "./tree";
import State from "./state";

export default class MCTS {
    root: Node;

    constructor(rootState: State) {
        this.root = new Node(rootState, null, null);
    }

    public select(): Node {
        let node = this.root;

        while (node.children.length > 0 && !node.state.isDone() && node.expanded) {
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

        node.expanded = true;
    }

    public simulate(node: Node): number {
        const state = node.state.clone();

        while (!state.isDone()) {
            const possibleMoves = state.getPossibleMoves();
            const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

            state.makeMove(move);
        }

        return state.getReward();
    }

    public backpropagate(node: Node, reward: number): void {
        while (node !== null) {
            node.visits++;
            node.score += reward;

            node = node.parent!;
        }
    }

    public run(iterations: number): number {
        for (let i = 0; i < iterations; i++) {
            const node = this.select();

            if (node.state.isDone()) {
                this.backpropagate(node, node.state.getReward());
            } else {
                this.expand(node);

                const reward = this.simulate(node.children[Math.floor(Math.random() * node.children.length)]);

                this.backpropagate(node, reward);
            }
        }

        return this.root.children.reduce((a, b) => a.visits > b.visits ? a : b).move!;
    }
}