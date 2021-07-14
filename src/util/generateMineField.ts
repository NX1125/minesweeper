import { List } from "immutable";
import { IMine, MineFieldModel } from "../model";

function generateMineField(width: number, height: number, minesCount: number): MineFieldModel {
    const surroundings: number[][] = new Array(height);
    for (let y = 0; y < height; y++) {
        const row = new Array(width);
        for (let x = 0; x < width; x++) {
            row[x] = 0;
        }
        surroundings[y] = row;
    }

    const mineSet = new Set<string>();

    const mines: {
        x: number;
        y: number;
    }[] = [];
    for (let i = 0; i < minesCount; i++) {
        const x = Math.min(Math.floor(Math.random() * width), width - 1);
        const y = Math.min(Math.floor(Math.random() * height), height - 1);
        const key = `${x}_${y}`
        if (mineSet.has(key)) {
            i--;
            continue;
        }
        mineSet.add(key);

        mines.push({x, y});
    }

    for (const {x, y} of mines) {
        const minX = Math.max(0, x - 1);
        const maxX = Math.min(width, x + 2);

        const minY = Math.max(0, y - 1);
        const maxY = Math.min(height, y + 2);

        for (let iy = minY; iy < maxY; iy++) {
            for (let ix = minX; ix < maxX; ix++) {
                surroundings[iy][ix]++;
            }
        }
    }
    for (const {x, y} of mines) {
        surroundings[y][x] = -1;
    }

    return List(surroundings).map(row => List(row).map<IMine>(surrounding => ({
        surrounding,
        marker: undefined,
        isBomb: surrounding === -1,
        revealed: false,
    })));
}

export default generateMineField;
