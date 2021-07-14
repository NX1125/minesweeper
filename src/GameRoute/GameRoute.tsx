import React from 'react';

import { useLocation } from 'react-router-dom';

import Game from "../Game/Game";

const GameRoute: React.FC = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    return (
        <Game width={+(params.get('width') ?? 0)}
              height={+(params.get('height') ?? 0)}
              minesCount={+(params.get('mines') ?? 0)}/>
    );
};

export default GameRoute;
