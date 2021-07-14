import { List } from "immutable";

import { IMine } from "../model";

export default function revealMines(
    field: List<List<IMine>>,
): List<List<IMine>> {
    return field.map(row => row.map(mine => ({
        ...mine,
        revealed: mine.revealed || (mine.isBomb && mine.marker === undefined),
    })))
}
