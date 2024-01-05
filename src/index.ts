import MCTS from "./mcts/classes/mcts";
import State from "./mcts/classes/state";

export default function mcts() {
    let state = new State();

    while (true) {
        const mcts = new MCTS(state.clone());
        let move = mcts.run(100000);
        state.makeMove(move);
        console.log(move)
        console.log(state.board);

        if (state.getWinner() !== 0) {
            console.log("Winner: " + state.getWinner());
            break;
        } else if (state.tie()) {
            console.log("Tie");
            break;
        }
    }
}