import type Node from "./types/tree";

const SCALAR = 1 / (2 * Math.SQRT2);

/**
    * Gets the UCB of a given node.
    * @param node The node to get the UCB of.
    * @returns The UCB of the node.
    * @memberof UCB
    * @public
*/
export default function UCB(node: Node): number {
    if (node.visits === 0) return Infinity;
    return (node.score / node.visits) + SCALAR * Math.sqrt(Math.log(node.parent!.visits) / node.visits);
}