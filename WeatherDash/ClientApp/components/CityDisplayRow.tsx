import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface CityDisplayRowProps {
    cityName: string
    userName: string
    fetchUserCities: (name: string) => void
}

export class CityDisplayRow extends React.Component<CityDisplayRowProps, {}>{
    public constructor(props: any) {
        super(props);
        this.removeCityFromUser = this.removeCityFromUser.bind(this);
    }

    public render() {
        return (
            <div className="city-display-row">
                <h1>{this.props.cityName}</h1>
                <button onClick={this.removeCityFromUser}>Delete</button>
                <Link to={`/${this.props.userName}/${this.props.cityName}`}>View Information</Link>
            </div>
        );
    }

    public removeCityFromUser() {
        axios.post(`/api/User/delete`, { name: this.props.userName, city: this.props.cityName }).then(() => {
            this.props.fetchUserCities(this.props.userName);
        }).catch(() => {
            this.props.fetchUserCities(this.props.userName);
        });
    }
}