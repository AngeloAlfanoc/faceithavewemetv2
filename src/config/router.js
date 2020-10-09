import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Compare from '../pages/compare'
import Home from '../pages/index'
import React from 'react';
import {useSelector} from 'react-redux'

const Router = () => {
  const playerOneName = useSelector(state => state.isPlayerOneName);
  const playerTwoName = useSelector(state => state.isPlayerTwoName);



  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} render={() => <Home />} />
          <Route path={`/compare`} render={() => <Compare />} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default Router;
