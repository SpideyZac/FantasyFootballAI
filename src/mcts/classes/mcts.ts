import Node from "./tree";
import State from "./state";

/**
    * The Monte Carlo Tree Search algorithm.
    * @class MCTS
    * @public
*/
export default class MCTS {
    root: Node;

    /**
        * Creates an instance of MCTS.
        * @param rootState The root state of the game.
        * @memberof MCTS
        * @public
    */
    constructor(rootState: State) {
        this.root = new Node(rootState, null, null);
    }

    /**
        * Selects a node to expand from.
        * @returns The node to expand from.
        * @memberof MCTS
        * @public
    */
    public select(): Node {
        let node = this.root;

        while (node.children.length > 0 && !node.state.isDone() && node.expanded) {
            node = node.children.reduce((a, b) => a.getUCB() > b.getUCB() ? a : b);
        }

        return node;
    }

    /**
        * Expands a given node.
        * @param node The node to expand.
        * @memberof MCTS
        * @public
    */
    public expand(node: Node): void {
        const possibleMoves = node.state.getPossibleMoves();

        for (const move of possibleMoves) {
            const state = node.state.clone();
            state.makeMove(move);

            node.children.push(new Node(state, move, node));
        }

        node.expanded = true;
    }

    /**
        * Simulates a game from a given node.
        * @param node The node to simulate from.
        * @returns The reward of the simulation.
        * @memberof MCTS
        * @public
    */
    public simulate(node: Node): number {
        const state = node.state.clone();

        while (!state.isDone()) {
            const possibleMoves = state.getPossibleMoves();
            const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

            state.makeMove(move);
        }

        return state.getReward();
    }

    /**
        * Backpropagates the reward from a given node to the root node.
        * @param node The node to backpropagate from.
        * @param reward The reward to backpropagate.
        * @memberof MCTS
        * @public
    */
    public backpropagate(node: Node, reward: number): void {
        while (node !== null) {
            node.visits++;
            node.score += reward;

            node = node.parent!;
        }
    }

    /**
        * Runs the MCTS algorithm for a given number of iterations.
        * @param iterations The number of iterations to run the algorithm for.
        * @returns The best move to make.
        * @memberof MCTS
        * @public
    */
    public run(iterations: number): any {
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
