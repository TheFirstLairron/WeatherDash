import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { CityDisplayRow } from './CityDisplayRow';


type UserDashProps = RouteComponentProps<{ name: string }>;

interface UserDashState {
    input: string,
    cityNames: string[],
    loading: boolean
}

export class UserDash extends React.Component<UserDashProps, UserDashState> {

    public constructor(props: UserDashProps) {
        super(props);

        this.state = {
            input: '',
            cityNames: [],
            loading: true
        }

        this.getCitiesForUser = this.getCitiesForUser.bind(this);
    }

    public componentDidMount() {
        this.getCitiesForUser(this.props.match.params.name);
    }

    public render() {
        return (
            <div>
                Name: {this.props.match.params.name}
                <div>
                    <input
                        type="text"
                        placeholder="City, St"
                        onChange={({ target }) => this.setState({ ...this.state, input: target.value })}
                    />
                    <button onClick={({ target }) => {
                        if (this.state.input) {
                            this.addCityToUser(this.state.input);
                        }
                    }}>Submit</button>
                </div>
                {
                    this.state.cityNames.length > 0 &&
                    !this.state.loading &&
                    <div>
                        {
                            this.state.cityNames.map(value => {
                                return (
                                    <div>
                                        <CityDisplayRow
                                            cityName={value}
                                            userName={this.props.match.params.name}
                                            fetchUserCities={this.getCitiesForUser}
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
                }
                {
                    this.state.cityNames.length === 0 &&
                    this.state.loading &&
                    <div>Loading Cities...</div>
                }
                {
                    this.state.cityNames.length === 0 &&
                    !this.state.loading &&
                    <div>There are no cities available for this account</div>
                }
            </div>
        );
    }

    public getCitiesForUser(name: string) {
        axios.get(`/api/user/${name}`).then((value: any) => {
            let values = value.data;
            values = values.filter((city: string) => city);

            this.setState({
                ...this.state,
                cityNames: values,
                loading: false
            });
        }).catch(() => {
            this.setState({
                ...this.state,
                loading: false
            });
        })
    }

    public addCityToUser(city: string) {
        axios.post(`/api/User/add`, { name: this.props.match.params.name, city }).then(() => {
            this.getCitiesForUser(this.props.match.params.name);
            this.setState({
                ...this.state,
                input: ''
            });
        }).catch(() => {
            this.getCitiesForUser(this.props.match.params.name);
            this.setState({
                ...this.state,
                input: ''
            });
        });
    }
}
