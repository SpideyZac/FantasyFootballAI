import State from "./state";
import UCB from "../ucb";

export default class Node {
    constructor(
        public state: State,
        public move: any | null,
        public parent: Node | null,
        public children: Node[] = [],
        public visits: number = 0,
        public score: number = 0,
        public expanded: boolean = false,
    ) {}

    public clone(): Node {
        return new Node(this.state.clone(), this.move, this.parent, this.children.slice(), this.visits, this.score, this.expanded);
    }

    public getUCB(): number {
        return UCB(this);
    }
}