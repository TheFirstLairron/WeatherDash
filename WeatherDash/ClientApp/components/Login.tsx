import * as React from 'react';
import { Link } from 'react-router-dom'

interface LoginState {
    userName: string
}

export class Login extends React.Component<{}, LoginState>{
    public constructor(props: any) {
        super(props);

        this.state = {
            userName: ''
        };
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
    }

    public render() {
        return (
            <div>
                <input
                    type='text'
                    placeholder='Enter a name'
                    value={this.state.userName}
                    onChange={this.handleUserNameChange}
                />
                {
                    this.state.userName &&
                    <div className="login-button">
                        <Link className="login-button-link" to={`/${this.state.userName}`}>Login</Link>
                    </div>
                }
            </div>
        );
    }

    public handleUserNameChange(event: any) {
        this.setState({
            userName: event.target.value
        });
    }
}