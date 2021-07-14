import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.scss';

import GameRoute from "./GameRoute/GameRoute";
import NewGameRoute from "./NewGameRoute/NewGameRoute";

const App = () => {
    return (
        <div className="App w-100 vh-100 d-flex flex-column justify-content-center align-items-center overflow-hidden">
            <BrowserRouter>
                <Switch>
                    <Route path="/game"
                           component={GameRoute}/>
                    <Route path="/"
                           component={NewGameRoute}/>
                </Switch>
            </BrowserRouter>
            <p className="small text-secondary align-self-end ms-auto me-5">
                v{process.env.REACT_APP_VERSION}
            </p>
        </div>
    );
};

export default App;
