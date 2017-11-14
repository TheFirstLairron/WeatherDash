import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Login } from './Login';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {

    public constructor(props?: RouteComponentProps<{}>) {
        super(props);
    }

    public render() {
        return (
            <Login />
        );
    }
}
