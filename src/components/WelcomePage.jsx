/* eslint-disable react/jsx-one-expression-per-line, react/jsx-indent-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';

import AppContext from './AppState.jsx';
import NavBar from './NavBar.jsx';
import WeatherConditions from './WeatherConditions.jsx';
import Forecast from './Forecast.jsx';

import { getCurrentWeatherByLatLon } from '../utils/openweather_api.js';

const WelcomePage = () => (
	<AppContext.Consumer>
		{context => <BaseWelcomePage context={context} /> }
	</AppContext.Consumer>
);

class BaseWelcomePage extends Component {
	componentDidMount() {
		const { context } = this.props;
		const {
			setWeatherConditions,
			setCurrentConditionsLoading,
		} = context;

		setCurrentConditionsLoading(true);
		getCurrentWeatherByLatLon(/* null means get current location */)
			.then((response) => {
				console.log(response);
				if (response.errMsg === undefined) {
					setWeatherConditions({
						zip: response.data.name,
						datetime: response.data.dt,
						main: response.data.main,
						weather: response.data.weather[0],
					});
					setCurrentConditionsLoading(false);
				} else {
					// Todo
					setCurrentConditionsLoading(false);
				}
			});
	}

	render() {
		return (
			<BrowserRouter>
				<div className="container">
					{/* Always render the NavBar */}
					<Route component={NavBar} />
					<Route
						exact path="/" // eslint-disable-line react/jsx-max-props-per-line
						render={() => (
							// Could use component here, but demo using direct render
							<WeatherConditions />
						)
						}
					/>
					<Route path="/forecast" component={Forecast} />
					<Route path="/details/:city" component={WeatherConditions} />
				</div>
			</BrowserRouter>
		);
	}
}

BaseWelcomePage.propTypes = {
	context: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default WelcomePage;
