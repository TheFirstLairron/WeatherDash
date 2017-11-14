import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { WeatherResult } from '../weather-result';

type CityViewProps = RouteComponentProps<{ name: string, city: string }>;

interface CityViewState {
    weatherInfo?: WeatherResult;
    loading: boolean;
}

export class CityView extends React.Component<CityViewProps, CityViewState>{

    public constructor(props: CityViewProps) {
        super(props);

        this.state = {
            weatherInfo: undefined,
            loading: true
        };
    }

    public componentWillMount(){
        this.getWeatherData();
    }

    public render() {
        return (
            <div>
                {
                    this.state.weatherInfo &&
                    !this.state.loading &&
                    <div>
                        <h1>{this.props.match.params.city}!</h1>
                        <div>{`${this.state.weatherInfo.main.temp} degrees`}</div>
                        <div>{`Humidity: ${this.state.weatherInfo.main.humidity}% `}</div>
                        <div>{`Visibility: ${this.state.weatherInfo.visibility} feet`}</div>
                        <div>{`Clouds: ${this.state.weatherInfo.clouds.all}%`}</div>
                    </div>
                }
                {
                    !this.state.weatherInfo &&
                    !this.state.loading &&
                    <div>
                        There is no data for this city
                    </div>
                }
                {
                    !this.state.weatherInfo &&
                    this.state.loading &&
                    <div>
                        Loading weather data...
                    </div>
                }
                <Link to={`/${this.props.match.params.name}`}>Return to dashboard</Link>
            </div>
        );
    }

    public getWeatherData() {
        const KEY = 'b7465c958274835886bef0b18f2fdf87'
        const API_ROOT = `https://api.openweathermap.org/data/2.5/weather?appid=${KEY}&units=imperial`;
        axios.get(`${API_ROOT}&q=${this.props.match.params.city}`).then((response) => {
            let data = response.data as WeatherResult;
            this.setState({
                weatherInfo: data,
                loading: false
            })
        }).catch(() => {
            this.setState({
                ...this.state,
                loading: false
            })
        });
    }


    public addCityToUserList() {

    }
}