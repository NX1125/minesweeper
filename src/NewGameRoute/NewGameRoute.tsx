import React, { useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import Dialog from "../Dialog/Dialog";
import IntegerInput from "../Dialog/NumberInput/IntegerInput";

interface IProps {
}

const NewGameRoute: React.FC<IProps> = () => {
    const location = useLocation();
    const history = useHistory();

    const params = new URLSearchParams(location.search ?? '');

    const [width, setWidth] = useState(+(params.get('width') || 40));
    const [height, setHeight] = useState(+(params.get('height') || 20));
    const [minesCount, setMinesCount] = useState(() => +(params.get('mines') || Math.floor(width * height * 0.1)));

    const onCreate = () => {
        history.push({
            pathname: '/game',
            search: `?width=${width}&height=${height}&mines=${minesCount}`,
        });
    };

    return (
        <Dialog confirmButton="Create"
                isValid={width > 0 && height > 0 && minesCount > 0 && minesCount <= width * height}
                onSubmit={onCreate}>
            <IntegerInput value={width}
                          label="Width"
                          id="width"
                          onChange={setWidth}/>
            <IntegerInput value={height}
                          label="Height"
                          id="Height"
                          onChange={setHeight}/>
            <IntegerInput value={minesCount}
                          label="Mines Count"
                          id="mines-count"
                          onChange={setMinesCount}/>
        </Dialog>
    );
};

export default NewGameRoute;
