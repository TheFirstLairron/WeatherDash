import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { UserDash } from './components/UserDash';
import { CityView } from './components/CityView';

export const routes = (
    <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/:name/:city" component={CityView} />
            <Route path="/:name" component={UserDash} />
        </Switch>
    </Layout>
);
