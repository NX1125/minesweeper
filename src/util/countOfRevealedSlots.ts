import { MineFieldModel } from "../model";

export default function countOfRevealedSlots(field: MineFieldModel) {
    return field.reduce((sum, row) => sum + row.count(value => value.revealed), 0);
}
