import State from "../classes/state";

/**
    * Represents a node in the tree.
    * @interface Node
    * @public
*/
export default interface Node {
    state: State;
    parent: Node | null;
    children: Node[];
    visits: number;
    score: number;
}