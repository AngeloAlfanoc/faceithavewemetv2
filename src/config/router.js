import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Compare from '../pages/compare'
import React from 'react';




const Router = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/"  render={() => <Compare />} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default Router;
