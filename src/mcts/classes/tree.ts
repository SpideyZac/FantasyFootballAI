import State from "./state";
import UCB from "../ucb";

/**
    * Represents a node in the tree.
    * @class Node
    * @public
*/
export default class Node {
    /**
        * Creates an instance of Node.
        * @param state The state of the game.
        * @param move The move that led to this state.
        * @param parent The parent node.
        * @param children The children nodes.
        * @param visits The number of times this node has been visited.
        * @param score The score of this node.
        * @param expanded Whether or not this node has been expanded.
        * @memberof Node
        * @public
    */
    constructor(
        public state: State,
        public move: any | null,
        public parent: Node | null,
        public children: Node[] = [],
        public visits: number = 0,
        public score: number = 0,
        public expanded: boolean = false,
    ) {}

    /**
        * Clones the node.
        * @returns The cloned node.
        * @memberof Node
        * @public
    */
    public clone(): Node {
        return new Node(this.state.clone(), this.move, this.parent, this.children.slice(), this.visits, this.score, this.expanded);
    }

    /**
        * Gets the UCB of the node.
        * @returns The UCB of the node.
        * @memberof Node
        * @public
    */
    public getUCB(): number {
        return UCB(this);
    }
}