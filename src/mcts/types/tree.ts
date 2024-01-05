import State from "../classes/state";

export default interface Node {
    state: State;
    parent: Node | null;
    children: Node[];
    visits: number;
    score: number;
}