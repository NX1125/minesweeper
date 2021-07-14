import React, { useState } from 'react';

import { Link } from "react-router-dom";

import { IMine, MineFieldModel } from "../model";

import generateMineField from "../util/generateMineField";
import floodFill from "../util/floodFill";
import revealMines from "../util/revealMines";
import nextMarker from "../util/nextMarker";

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
                setGame(game => ({
                    ...game,
                    field: floodFill(x, y, game.field, props.width),
                }));
            }
        }
    };

    const onNewGame = () => {
        setGame(newGame(props));
    };

    const header = game.state !== GameState.PLAYING ? (
        <div className="text-white d-flex flex-row align-items-start">
            <div className="text-white">
                <h1>Game Over!</h1>
                <p>{game.state === GameState.LOSER ? 'Loser :(' : 'Winner :)'}</p>
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
    ) : undefined;

    return (
        <div className="App w-100 vh-100 d-flex flex-column justify-content-end align-items-center p-3">
            <div className="d-flex flex-column">
                {header}
                <div className="mt-auto">
                    <MineField field={game.field}
                               isDisabled={game.state !== GameState.PLAYING}
                               onClick={onUpdateMine}/>
                </div>
            </div>
        </div>
    );
};

export default Game;
