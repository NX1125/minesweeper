import { List } from "immutable";

export enum Marker {
    FLAG,
    UNSURE,
}

export interface IMine {
    marker: Marker | undefined;
    revealed: boolean;
    surrounding: number;
    isBomb: boolean;
}

export type MineFieldModel = List<List<IMine>>;

