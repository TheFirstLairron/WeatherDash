import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return (
            <div className='header'>
                <Link className="header-link" to="/">Home</Link>
            </div>
        );
    }
}
