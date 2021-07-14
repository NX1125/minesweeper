import React from 'react';

import { List } from "immutable";

import './MineField.scss'

import { IMine } from "../model";

import { Mine } from "./Mine";

interface IProps {
    field: List<List<IMine>>;
    isDisabled?: boolean;

    onClick(x: number, y: number, mine: IMine, flag: boolean): void;
}

const MineField: React.FC<IProps> = props => {
    const mines = props.field.map((row, rowIndex) => {
        const cells = row.map((mine, mineIndex) => {
            const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
                if (mine.revealed)
                    return;

                props.onClick(mineIndex, rowIndex, mine, event.shiftKey || event.button !== 0);
            };

            const onContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
                if (mine.revealed)
                    return true;

                onClick(event);

                event.preventDefault();

                return false;
            };

            return (
                <div className="d-table-cell align-middle text-center"
                     style={{cursor: mine.revealed || props.isDisabled ? 'default' : 'pointer'}}
                     key={mineIndex}>
                    <button type="button"
                            disabled={mine.revealed || props.isDisabled}
                            data-revealed={mine.revealed}
                            onClick={onClick}
                            onContextMenu={onContextMenu}
                            className="MineButton d-flex justify-content-center align-items-center">
                        <Mine {...mine}/>
                    </button>
                </div>
            );
        });
        return (
            <div key={rowIndex}
                 className="d-table-row">
                {cells}
            </div>
        );
    })
    return (
        <div className="MineField d-table">
            {mines}
        </div>
    );
};

export default MineField;
