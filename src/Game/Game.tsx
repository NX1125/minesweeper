import React, { useState } from 'react';

import { Link } from "react-router-dom";

import { IMine, MineFieldModel } from "../model";

import generateMineField from "../util/generateMineField";
import floodFill from "../util/floodFill";
import revealMines from "../util/revealMines";
import nextMarker from "../util/nextMarker";
import countOfRevealedSlots from "../util/countOfRevealedSlots";

import MineField from "../MineField/MineField";

enum GameState {
    PLAYING,
    WINNER,
    LOSER,
}

interface IProps {
    width: number;
    height: number;

    minesCount: number;
}

function newGame(props: IProps) {
    console.log(`Creating a new game ${props.width}x${props.height} with ${props.minesCount} mines`);
    return {
        state: GameState.PLAYING,
        field: generateMineField(
            props.width, props.height, props.minesCount,
        ),
    };
}

const Game: React.FC<IProps> = props => {
    const [game, setGame] = useState<{
        state: GameState;
        field: MineFieldModel;
    }>(() => newGame(props));

    const onUpdateMine = (x: number, y: number, mine: IMine, flag: boolean) => {
        if (flag) {
            const newMine: IMine = {
                ...mine,
                marker: nextMarker(mine.marker),
            };
            setGame(game => ({
                ...game,
                field: game.field.update(y, row => row!.set(x, newMine))
            }));
        } else {
            if (mine.isBomb) {
                // Game Over!
                setGame(game => ({
                    ...game,
                    state: GameState.LOSER,
                    field: revealMines(game.field),
                }));
            } else {
                setGame(game => {
                    const field = floodFill(x, y, game.field, props.width);
                    const revealedCount = countOfRevealedSlots(field);
                    return {
                        ...game,
                        field,
                        state: (props.width * props.height - revealedCount) === props.minesCount
                            ? GameState.WINNER
                            : GameState.PLAYING,
                    };
                });
            }
        }
    };

    const onNewGame = () => {
        setGame(newGame(props));
    };

    const header = game.state === GameState.PLAYING ? 'Minesweeper' : 'Game Over!';
    const status = game.state !== GameState.PLAYING ? (
        game.state === GameState.WINNER ? 'Winner :)' : 'Loser :('
    ) : 'Good Luck!';

    return (
        <div className="App w-100 d-flex flex-column justify-content-end align-items-center">
            <div className="d-flex flex-column my-auto">
                <div className="text-white d-flex flex-row align-items-start">
                    <div className="text-white">
                        <h1 className="h3">{header}</h1>
                        <p>{status}</p>
                    </div>
                    <button type="button"
                            className="btn btn-primary ms-auto"
                            onClick={onNewGame}>
                        <i className="bi bi-arrow-clockwise me-2"/>
                        New Game
                    </button>
                    <Link to={`/?width=${props.width}&height=${props.height}&mines=${props.minesCount}`}
                          className="btn btn-outline-secondary ms-2">
                        <i className="bi bi-gear me-2"/>
                        Config
                    </Link>
                </div>
                <MineField field={game.field}
                           isDisabled={game.state !== GameState.PLAYING}
                           onClick={onUpdateMine}/>
            </div>
        </div>
    );
};

export default Game;
