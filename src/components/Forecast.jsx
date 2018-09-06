/* eslint-disable react/jsx-indent-props, react/jsx-no-bind,
   arrow-body-style */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import queryString from 'query-string';

import { getForecastByCity } from '../utils/openweather_api.js';

import AppContext from './AppState.jsx';
import DayItem from './DayItem.jsx';
import Loading from './Loading.jsx';

const Forecast = ({ location, history }) => (
	<AppContext.Consumer>
		{context => (
			<BaseForecast
				context={context}
				location={location}
				history={history}
			/>
		)}
	</AppContext.Consumer>
);

Forecast.propTypes = {
	location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

class BaseForecast extends Component {
	componentDidMount() {
		const { context, location } = this.props;
		const {
			setForecastLoading,
			setForecast,
		} = context;

		this.city = queryString.parse(location.search).city;

		setForecastLoading(true);
		getForecastByCity(this.city)
			.then((response) => {
				console.log(response);
				setForecast({
					zip: response.data.city,
					data: response.data.list,
				});
				setForecastLoading(false);
			});
	}

	handleClick = (city) => {
		const { history } = this.props;

		city.city = this.city; // eslint-disable-line no-param-reassign
		history.push({
			pathname: `/details/${this.city}`,
			state: city,
		});
	};

	render() {
		const { context } = this.props;
		const { isForecastLoading, weatherForecast } = context.state;

		return isForecastLoading === true
				|| !weatherForecast.data
			? (
				<h1 className="forecast-header">
					<Loading />
				</h1>
			)
			: (
				<div>
					<h1 className="forecast-header">{this.city}</h1>
					<div className="forecast-container">
						{weatherForecast.data.map((listItem) => {
							return (
								<DayItem
									onClick={this.handleClick.bind(this, listItem)}
									key={listItem.dt}
									day={listItem}
								/>
							);
						})}
					</div>
				</div>
			);
	}
}

BaseForecast.propTypes = {
	context: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};


export default Forecast;
