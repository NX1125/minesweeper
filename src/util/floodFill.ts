import { List } from "immutable";

import { IMine } from "../model";

function getKey(x: number, y: number) {
    return `${x}_${y}`;
}

export default function floodFill(x: number, y: number,
                                  field: List<List<IMine>>,
                                  width: number) {
    const floodedSlots = new Set<string>([getKey(x, y)]);

    function getSlot(x: number, y: number): IMine {
        return field.get(y)!.get(x)!;
    }

    function spread(x: number, y: number) {
        const top = flood(x, y - 1);
        const bottom = flood(x, y + 1);
        const right = flood(x + 1, y);
        const left = flood(x - 1, y);

        if (top || left)
            flood(x - 1, y - 1);
        if (bottom || left)
            flood(x - 1, y + 1);
        if (top || right)
            flood(x + 1, y - 1);
        if (bottom || right)
            flood(x + 1, y + 1);
    }

    function flood(x: number, y: number) {
        if (x < 0 || x >= width || y < 0 || y >= field.size)
            return false;

        const key = getKey(x, y);
        const slot = getSlot(x, y);

        if (slot.revealed || slot.isBomb || slot.marker !== undefined || floodedSlots.has(key)) {
            return slot.revealed;
        }

        // Reveal it
        floodedSlots.add(key);

        if (slot.surrounding === 0)
            spread(x, y);

        return true;
    }

    const first = getSlot(x, y);

    if (first.surrounding === 0)
        spread(x, y);

    return field.map((row, y) => row.map<IMine>((slot, x) => (
        floodedSlots.has(getKey(x, y)) ? {
            ...slot,
            revealed: true,
        } : slot
    )))
}
