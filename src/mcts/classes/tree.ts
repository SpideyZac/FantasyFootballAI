import State from "./state";
import UCB from "../ucb";

export default class Node {
    constructor(
        public state: State,
        public move: number | null,
        public parent: Node | null,
        public children: Node[] = [],
        public visits: number = 0,
        public score: number = 0,
    ) {}

    public clone(): Node {
        return new Node(this.state.clone(), this.move, this.parent, this.children.slice(), this.visits, this.score);
    }

    public getUCB(): number {
        return UCB(this);
    }
}